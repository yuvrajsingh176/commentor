// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import {getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDd4N0h0626h-f1Rij9_UC5BMMrSfx62Zo",
  authDomain: "commenter-961ea.firebaseapp.com",
  projectId: "commenter-961ea",
  storageBucket: "commenter-961ea.appspot.com",
  messagingSenderId: "424559626087",
  appId: "1:424559626087:web:b4332c87bcca257ad391c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };