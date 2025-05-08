import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Verify from "./Verify.jsx"; // ⬅️ import your new mock page
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/verify/:token" element={<Verify />} />
      </Routes>
    </Router>
  </React.StrictMode>
);