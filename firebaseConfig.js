// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyChVYgm7RkNbAF-n3dp1lAryc5gXBpVqFs",
  authDomain: "final-a119d.firebaseapp.com",
  projectId: "final-a119d",
  storageBucket: "gs://final-a119d.appspot.com",
  messagingSenderId: "179200485605",
  appId: "1:179200485605:web:ee020ca8cb363d8241cc0c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db ,storage};
