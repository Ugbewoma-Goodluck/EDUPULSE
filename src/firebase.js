// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASJCGZ-nAfJliCngW7zp7ZdeVwv0BU8rQ",
  authDomain: "edupulse-997bc.firebaseapp.com",
  projectId: "edupulse-997bc",
  storageBucket: "edupulse-997bc.firebasestorage.app",
  messagingSenderId: "121304496583",
  appId: "1:121304496583:web:36400961459c4c31c0c1e2",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


/*
const analyzeSentiment = async (text) => {
  const API_URL = "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment";
  const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;

  try {
    const response = await axios.post(
      API_URL,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const labelScores = response.data[0]; // Array of 3 labels
    const topLabel = labelScores.reduce((prev, current) =>
      prev.score > current.score ? prev : current
    ).label;

    // Map Hugging Face labels to human-readable ones
    const labelMap = {
      LABEL_0: "negative",
      LABEL_1: "neutral",
      LABEL_2: "positive",
    };

    return labelMap[topLabel] || "unknown";

  } catch (err) {
    console.error("Error analyzing sentiment:", err.response?.data || err.message);
    return "error";
  }
};
*/