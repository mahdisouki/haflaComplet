import { initializeApp, getApps, getApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDU08rG5sz69BeCOO4198VE-KwVpl4PEEI",
  authDomain: "mazedpushnotification.firebaseapp.com",
  databaseURL: "https://mazedpushnotification-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mazedpushnotification",
  storageBucket: "mazedpushnotification.appspot.com",
  messagingSenderId: "895372185435",
  appId: "1:895372185435:web:ab9665f01683568451147e",
  measurementId: "G-M1VJ45WTBS"
};

// Initialize Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Retrieve firebase messaging instance
const messaging = getMessaging(app);

export { messaging };
