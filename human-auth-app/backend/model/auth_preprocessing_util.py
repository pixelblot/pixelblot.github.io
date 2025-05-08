import os
import pickle
import gc
from glob import glob

import numpy as np
import pandas as pd

import torch
import torch.nn as nn
from torch.utils.data import DataLoader
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.preprocessing import MinMaxScaler, StandardScaler
from sklearn.metrics.pairwise import euclidean_distances

# ==============================================================
# 1. Preprocessing
# ==============================================================

def preprocess_data_generalization_auth(data, user_id, session_id, drop_short_sessions=True, min_length=10):
    """
    Preprocess cursor tracking data: normalize x/y, retain timestamps, and embed user/session metadata.
    """
    if 'x' not in data.columns or 'y' not in data.columns:
        raise ValueError("Missing x or y coordinates in the data.")

    # Hardcoded user/session for now (replace later with dynamic parsing if needed)
    data = data.dropna(subset=['x', 'y']).copy()

    if drop_short_sessions and len(data) < min_length:
        return []

    # Normalize x/y
    scaler = MinMaxScaler()
    data[['x', 'y']] = scaler.fit_transform(data[['x', 'y']])

    # Prepare arrays
    data_array = data[['x', 'y']].values.astype('float32')
    pos_response = data['timestamp'].values.astype('float32')
    id_array = np.full(len(data), user_id, dtype=int)
    question_id = np.full(len(data), session_id)

    raw_data = [{
        'data': data_array,
        'pos_response': pos_response,
        'question_id': question_id,
        'id': id_array
    }]

    return raw_data

def load_preprocessing_results(output_dir, dataset_type, grid_id, add_mean, add_features, num_pcs, num_clusters):
    # Construct the filename
    pkl_filename = f"grid_{grid_id}_mean_{add_mean}_features_{add_features}_pcs_{num_pcs}_clusters_{num_clusters}_{dataset_type}.pkl"
    pkl_filepath = os.path.join(output_dir, pkl_filename)

    # Load the data
    with open(pkl_filepath, 'rb') as pkl_file:
        X_features, y_avg, unique_ids, kmeans_model = pickle.load(pkl_file)
        
    return X_features, y_avg, unique_ids, kmeans_model

# ==============================================================
# 2. Autoencoder
# ==============================================================

class LSTMAutoencoder(nn.Module):
    def __init__(self, input_dim, latent_dim, hidden_dim):
        super().__init__()
        self.encoder_lstm = nn.LSTM(input_dim, hidden_dim, batch_first=True)
        self.latent = nn.Linear(hidden_dim, latent_dim)
        self.decoder_lstm = nn.LSTM(latent_dim, hidden_dim, batch_first=True)
        self.output = nn.Linear(hidden_dim, input_dim)

    def forward(self, x):
        encoded, _ = self.encoder_lstm(x)
        latent = torch.sigmoid(self.latent(encoded[:, -1, :]))
        latent_repeated = latent.unsqueeze(1).repeat(1, x.size(1), 1)
        decoded, _ = self.decoder_lstm(latent_repeated)
        output = torch.sigmoid(self.output(decoded))
        return output

    def get_feat(self, x):
        encoded, _ = self.encoder_lstm(x)
        latent = torch.sigmoid(self.latent(encoded[:, -1, :]))
        return latent

# ==============================================================
# 3. Dataset
# ==============================================================

class Evaluation_Dataset_Memory(torch.utils.data.Dataset):
    def __init__(self, raw_data, chunk_size, ignore_qid=True, chunk_slider_interval=10):
        self.chunk_size = chunk_size
        self.ignore_qid = ignore_qid
        self.chunk_slider_interval = chunk_slider_interval
        self.init_data(raw_data)

    def init_data(self, raw_data):
        self.all_chunks = []
        self.all_qid = []
        self.all_id = []
        for cur_trial in raw_data:
            if self.ignore_qid:
                trajectory, qid, id_ = self.create_chunks_ignore_qid(cur_trial)
            else:
                trajectory, qid, id_ = self.create_chunks_by_qid(cur_trial)
            self.all_chunks.extend(trajectory)
            self.all_qid.extend(qid)
            self.all_id.extend(id_)

    def create_chunks_by_qid(self, data):
        chunk_data, chunk_qid, chunk_id = [], [], []
        for unique_qid in np.unique(data['question_id']):
            data_by_qid = data['data'][data['question_id'] == unique_qid]
            num_chunks = max((len(data_by_qid) - self.chunk_size) // self.chunk_slider_interval + 1, 0)
            for i in range(num_chunks):
                chunk = data_by_qid[i * self.chunk_slider_interval : i * self.chunk_slider_interval + self.chunk_size]
                chunk_data.append(chunk)
                chunk_qid.append(unique_qid)
                chunk_id.append(data['id'][0])
        return chunk_data, chunk_qid, chunk_id

    def create_chunks_ignore_qid(self, data):
        chunk_data, chunk_qid, chunk_id = [], [], []
        data_all = data['data']
        num_chunks = max((len(data_all) - self.chunk_size) // self.chunk_slider_interval + 1, 0)
        for i in range(num_chunks):
            chunk = data_all[i * self.chunk_slider_interval : i * self.chunk_slider_interval + self.chunk_size]
            chunk_data.append(chunk)
            chunk_qid.append(data['question_id'][0])
            chunk_id.append(data['id'][0])
        return chunk_data, chunk_qid, chunk_id

    def __getitem__(self, index):
        mouse_data = torch.from_numpy(self.all_chunks[index])
        return mouse_data, self.all_qid[index], self.all_id[index]

    def __len__(self):
        return len(self.all_chunks)

# ==============================================================
# 4. Feature Extraction
# ==============================================================

def extract_feature_auth(args, preprocessed_data):
    device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
    print(f'Using device: {device}')

    dataset = Evaluation_Dataset_Memory(preprocessed_data, args.chunk_size, ignore_qid=args.ignore_qid, chunk_slider_interval=args.chunk_slider_interval)
    data_loader = DataLoader(dataset, batch_size=args.batch_size, shuffle=False)

    model = LSTMAutoencoder(args.input_dim, args.latent_dim, args.hidden_dim).to(device)
    model.load_state_dict(torch.load(args.weights, map_location=device)['model_state_dict'])
    model.eval()

    processed_feat = dict()
    with torch.no_grad():
        for trajectory, qid, id_ in data_loader:
            trajectory = trajectory.to(device)
            feat = model.get_feat(trajectory).cpu().numpy()
            for i in range(len(trajectory)):
                pid = int(id_[i])
                qid_value = int(qid[i].item()) if isinstance(qid[i], torch.Tensor) else int(qid[i])
                if pid not in processed_feat:
                    processed_feat[pid] = dict()
                if qid_value not in processed_feat[pid]:
                    processed_feat[pid][qid_value] = []
                processed_feat[pid][qid_value].append(feat[i])

    for pid in processed_feat:
        for qid in processed_feat[pid]:
            processed_feat[pid][qid] = np.array(processed_feat[pid][qid])

    return processed_feat

##
##
##
def process_features_silent_auth(X, y, participant_ids, add_mean=True, add_features=False, 
                     num_pcs=0, num_clusters=0, n_windows=0, kmeans_model=None):
    """
    Process features and responses for each participant.
    
    If `num_clusters` > 0 and `kmeans_model` is provided, this function uses the pre-trained 
    K-Means model to predict cluster assignments for each chunk.

    Args:
        X (np.ndarray): Feature array of shape (num_chunks, num_features).
        y (np.ndarray): Response array of shape (num_chunks, num_questions).
        participant_ids (np.ndarray): Participant ID array of shape (num_chunks,).
        add_mean (bool, optional): Flag to control whether to include the mean of features. Defaults to True.
        add_features (bool, optional): Flag to control whether to compute enhanced features. Defaults to False.
        n_windows (int, optional): Number of non-overlapping windows to divide the data into. Defaults to 0.
        num_pcs (int, optional): Number of principal components to retain if PCA is applied (0 means no PCA). Defaults to 0.
        num_clusters (int, optional): Number of clusters to use if K-Means is applied (0 means no clustering). Defaults to 0.
        kmeans_model (KMeans, optional): Pre-trained K-Means model for clustering. If None, fit a new model.

    Returns:
        tuple:
            - X_processed (np.ndarray): Processed feature array for participants.
            - y_avg (np.ndarray): Averaged responses array of shape (num_participants, num_questions).
            - unique_ids (np.ndarray): Array of unique participant IDs.
    """
    if not any([add_mean, add_features, num_pcs > 0, num_clusters > 0, n_windows > 0]):
        print("Warning: No features selected. Defaulting to adding the mean.")
        add_mean = True

    unique_ids = np.unique(participant_ids)
    X_processed = []
    y_avg = []

    # Scale the features using MinMaxScaler
    scaler = MinMaxScaler()
    X_scaled = scaler.fit_transform(X)
    X_scaled = X
    
    # If clustering is required and no pre-trained model is provided, fit the K-Means model on the current data
    if num_clusters > 0 and kmeans_model is None:
        print("Computing Clusters")
        kmeans_model = KMeans(n_clusters=num_clusters, random_state=42)
        kmeans_model.fit(X_scaled)

    for uid in unique_ids:
        participant_idx = participant_ids == uid
        X_participant = X_scaled[participant_idx]
        y_participant = y[participant_idx]

        features = []
        num_chunks = X_participant.shape[0]

        # Compute windowed mean features if n_windows > 0
        if n_windows > 0 and num_chunks >= n_windows:
            window_size = num_chunks // n_windows
            windowed_means = []
            for w in range(n_windows):
                start = w * window_size
                end = (w + 1) * window_size if w != n_windows - 1 else num_chunks
                window = X_participant[start:end]
                window_mean = np.mean(window, axis=0)
                windowed_means.append(window_mean)
            windowed_means = np.array(windowed_means).flatten()
            features.append(windowed_means)

        if add_mean:
            # Compute Mean for each participant
            mean = np.mean(X_participant, axis=0)
            features.append(mean)

        if add_features:
            # Additional features (e.g., std, slopes, etc.) would be added here as before
            pass

        if num_pcs > 0:
           pass

        if num_clusters > 0:
            # Predict cluster labels for the participant using the pre-trained K-Means model
            participant_clusters = kmeans_model.predict(X_participant)
            # Calculate the relative time (proportion of chunks) spent in each cluster
            time_in_clusters = np.array([np.mean(participant_clusters == cluster) for cluster in range(num_clusters)])
            features.append(time_in_clusters)

        if not features:
            # This should not happen because we have already set add_mean=True if all options were off
            print(f"Warning: No features were added for participant {uid}. Adding mean.")
            mean = np.mean(X_participant, axis=0)
            features.append(mean)

        # Concatenate all features into a single array for this participant
        X_processed.append(np.concatenate(features))

        # Average the responses (they are the same across chunks)
        y_avg.append(np.mean(y_participant, axis=0))

    X_processed = np.array(X_processed)
    y_avg = np.array(y_avg)
    return X_processed, y_avg, unique_ids, kmeans_model

def score_kmeans_similarity_chunks(feature_array, kmeans_model):
    distances = euclidean_distances(feature_array, kmeans_model.cluster_centers_)  # shape: (n_chunks, n_clusters)
    min_distances = np.min(distances, axis=1)  # one per chunk
    scores = np.exp(-min_distances)  # higher = more similar
    return np.mean(scores) # aggregate score for all chunks

def score_similarity_to_reference(X_new, X_reference):
    distances = euclidean_distances(X_new, X_reference)  # shape: (1, n_reference)
    min_dist = np.min(distances)
    return np.exp(-min_dist)  # Higher = more plausible