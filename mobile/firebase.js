import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBldHFi_OH5uDJkhLgZR8CDUFKtK2Y5v30",
  authDomain: "lifeos-app-devops.firebaseapp.com",
  projectId: "lifeos-app-devops",
  storageBucket: "lifeos-app-devops.firebasestorage.app",
  messagingSenderId: "457400221847",
  appId: "1:457400221847:web:38ea5541895b5c679669d2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);