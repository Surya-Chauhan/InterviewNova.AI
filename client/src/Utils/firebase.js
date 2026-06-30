import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "nova-8a318.firebaseapp.com",
  projectId: "nova-8a318",
  storageBucket: "nova-8a318.firebasestorage.app",
  messagingSenderId: "847718979578",
  appId: "1:847718979578:web:696ad6d0e3bcbd7d50f643"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}