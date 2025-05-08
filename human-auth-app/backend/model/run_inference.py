import os
import pandas as pd
import numpy as np
import torch
from torch.utils.data import DataLoader
import pickle

from auth_preprocessing_util import (
    preprocess_data_generalization_auth,
    Evaluation_Dataset_Memory,
    LSTMAutoencoder,
    load_preprocessing_results,
    process_features_silent_auth,
    score_kmeans_similarity_chunks,
    score_similarity_to_reference
)

# Device config (Render likely runs CPU)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load model arguments and weights
grid_id = "5"
logdir = "mila"
args_df = pd.read_csv(os.path.join(logdir, f"args_{grid_id}.csv"))
checkpoint_path = os.path.join(logdir, f"checkpoint_{grid_id}.pth")

class Args: pass
args = Args()
args.chunk_size = int(args_df['chunk_size'][0])
args.ignore_qid = True
args.chunk_slider_interval = 10
args.latent_dim = int(args_df['latent_dim'][0])
args.weights = checkpoint_path
args.batch_size = int(args_df['batch_size'][0])
args.input_dim = int(args_df['input_dim'][0])
args.hidden_dim = int(args_df['hidden_dim'][0])

# Initialize model
model = LSTMAutoencoder(args.input_dim, args.latent_dim, args.hidden_dim).to(device)
checkpoint = torch.load(args.weights, map_location=device, weights_only=True)
model.load_state_dict(checkpoint['model_state_dict'])
model.eval()

# Load reference distribution and cluster model
X_processed_test, _, _, kmeans_model_test = load_preprocessing_results(
    logdir, dataset_type="test", grid_id=grid_id,
    add_mean=0, add_features=0, num_pcs=0, num_clusters=500
)

# Load and preprocess one cursor session
file_path = "/Users/veithweilnhammer/Downloads/cursor_data_1746724677556.csv"  # <--- Replace this dynamically later
user_id = 123
session_id = 456
input_data = pd.read_csv(file_path)
preprocessed_data = preprocess_data_generalization_auth(input_data, user_id, session_id)

# Extract latent features
dataset = Evaluation_Dataset_Memory(
    preprocessed_data, args.chunk_size,
    ignore_qid=args.ignore_qid,
    chunk_slider_interval=args.chunk_slider_interval
)
data_loader = DataLoader(dataset, batch_size=args.batch_size, shuffle=False)

feature_array, time_array, id_array = [], [], []
with torch.no_grad():
    for mouse_data, _, pid in data_loader:
        mouse_data = mouse_data.to(device)
        feat = model.get_feat(mouse_data).cpu().numpy()
        feature_array.extend(feat)
        id_array.extend([user_id] * len(feat))
        time_array.extend([np.nan] * len(feat))  # or use real timestamps

# Postprocess for scoring
X, _, _, _ = process_features_silent_auth(
    np.array(feature_array, dtype=np.float64),
    np.array(time_array, dtype=np.float64),
    np.array(id_array).astype(int),
    add_mean=0, add_features=0,
    num_pcs=0, num_clusters=500,
    kmeans_model=kmeans_model_test
)

# Compute scores
movement_score = score_kmeans_similarity_chunks(feature_array, kmeans_model_test)
mila_score = score_similarity_to_reference(X, X_processed_test)
human_score = np.mean([movement_score, mila_score])

print(f'datapoints: {input_data.shape[0]}; scores: embedding = {movement_score }, mila = {mila_score}, human = {human_score}')