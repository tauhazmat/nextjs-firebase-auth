import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCzeFoaWh4xNGu3XJhiHxndEwOEfaVRTUE",
  authDomain: "tauha-auth.firebaseapp.com",
  projectId: "tauha-auth",
  storageBucket: "tauha-auth.firebasestorage.app",
  messagingSenderId: "746906834872",
  appId: "1:746906834872:web:1944c9814267d04da2214d",
  measurementId: "G-WFK1RT5EF2"
};
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export { auth, googleProvider }

