import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCJRn9bouqfj9UzpX5wID1G6FqFz2zq3qo",
    authDomain: "stackov-c4b72.firebaseapp.com",
    projectId: "stackov-c4b72",
    storageBucket: "stackov-c4b72.appspot.com",
    messagingSenderId: "463656481084",
    appId: "1:463656481084:web:04d5f780081dfacc396e39",
    measurementId: "G-F5KD3CEC8W"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  
  export { auth, provider, signInWithPopup };  