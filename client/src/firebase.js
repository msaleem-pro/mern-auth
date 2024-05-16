import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBmRODkvold-_NJjFm9fpMH72mgMDm77Po",
  authDomain: "mern-auth-4a727.firebaseapp.com",
  projectId: "mern-auth-4a727",
  storageBucket: "mern-auth-4a727.appspot.com",
  messagingSenderId: "921986076611",
  appId: "1:921986076611:web:ec278ac6c2a0c9481e3776",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
