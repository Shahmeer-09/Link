// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDlUvJJSbUsfas4YgP8YbU4dvypHNLx9YU",
  authDomain: "linkup-2ccb1.firebaseapp.com",
  projectId: "linkup-2ccb1",
  storageBucket: "linkup-2ccb1.appspot.com",
  messagingSenderId: "624652388776",
  appId: "1:624652388776:web:7488f58e9eaebb7c45f59d",
  measurementId: "G-231DYP15YJ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { auth };