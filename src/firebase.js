// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDy6Q_zv7nVtoTdZRlPU1q6vwNuP0cKvAI",
  authDomain: "sentimental-analysis-e558a.firebaseapp.com",
  projectId: "sentimental-analysis-e558a",
  storageBucket: "sentimental-analysis-e558a.appspot.com",
  messagingSenderId: "1029561202115",
  appId: "1:1029561202115:web:61faee054a7455ab4a3976",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
