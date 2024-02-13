// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBua3BG6HWiCJJR9C-sbJHhP8wId9bs6Lc",
  authDomain: "ageup-history.firebaseapp.com",
  projectId: "ageup-history",
  storageBucket: "ageup-history.appspot.com",
  messagingSenderId: "605708485913",
  appId: "1:605708485913:web:eb8c1653384ecb25013188",
  measurementId: "G-SPZVCDLFZ3"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAnalytics = async () => { await isSupported() && getAnalytics(firebaseApp) } ;
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseFirestore  = getFirestore(firebaseApp);