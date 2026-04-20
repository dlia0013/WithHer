import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkob-IFiGus_2jAu1JSVI7-6-Suu1oe3g",
  authDomain: "women-s-health-7bf69.firebaseapp.com",
  projectId: "women-s-health-7bf69",
  storageBucket: "women-s-health-7bf69.firebasestorage.app",
  messagingSenderId: "433809002401",
  appId: "1:433809002401:web:e4120880eeb8f3878b05e0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);