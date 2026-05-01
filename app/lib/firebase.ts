import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9XTzjz28dz3EKiTnw8m3NxceYAA9ygT0",
  authDomain: "lite-society.firebaseapp.com",
  projectId: "lite-society",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ??
    "lite-society.firebasestorage.app",
};

const app = getApps()[0] ?? initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
