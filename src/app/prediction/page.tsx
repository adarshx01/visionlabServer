'use client'
import React, { useState } from 'react';
import axios from 'axios';

const RoboflowInference = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const ROBOFLOW_API_KEY = 'rf_TwumwaJV3Hb5hFslGZr4mA017xc2'; // Replace with your actual Roboflow API key
  const ROBOFLOW_MODEL = 'new_violence_dataset-vr4gq'; // Replace with your Roboflow model ID
  const ROBOFLOW_VERSION = '1'; // Replace with the model version

  const handleImageChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleInference = async () => {
    if (!imageUrl) {
      setError('Please provide a valid image URL');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        `https://detect.roboflow.com/${ROBOFLOW_MODEL}/${ROBOFLOW_VERSION}`,
        {},
        {
          params: {
            api_key: ROBOFLOW_API_KEY,
            image: imageUrl,
          },
        }
      );

      const predictions = response.data.predictions;
      setDetections(predictions);
    } catch (err) {
      setError('Error performing inference: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Roboflow Object Detection Inference</h1>

      <input
        type="text"
        placeholder="Enter Image URL"
        value={imageUrl}
        onChange={handleImageChange}
      />
      <button onClick={handleInference} disabled={loading}>
        {loading ? 'Running Inference...' : 'Run Inference'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {detections.length > 0 && (
        <div>
          <h2>Detections:</h2>
          <ul>
            {detections.map((detection, index) => (
              <li key={index}>
                Class: {detection.class} - Confidence: {detection.confidence} - 
                Bounding Box: [{detection.x}, {detection.y}, {detection.width}, {detection.height}]
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RoboflowInference;
