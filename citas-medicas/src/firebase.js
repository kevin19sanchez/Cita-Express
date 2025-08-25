// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDRW3C7WRMJi1UB7R5hEaHGDtF7InbgqIo",
    authDomain: "citas-medicas-react-70bd8.firebaseapp.com",
    projectId: "citas-medicas-react-70bd8",
    storageBucket: "citas-medicas-react-70bd8.firebasestorage.app",
    messagingSenderId: "904921823536",
    appId: "1:904921823536:web:12f4a09796c5fe5f60b0f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)