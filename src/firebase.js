// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe5_fh18YA4TB-cbvjaqmzNcX5Lk_m1hY",
  authDomain: "survey-6113e.firebaseapp.com",
  projectId: "survey-6113e",
  storageBucket: "survey-6113e.appspot.com",
  messagingSenderId: "200104717450",
  appId: "1:200104717450:web:1187cd00cd5bb90e649173",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
