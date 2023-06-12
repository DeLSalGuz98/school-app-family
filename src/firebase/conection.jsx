// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYuauz-_K8XMh4Ohavvk6wegeXF7klTuU",
  authDomain: "app-colegio-50120.firebaseapp.com",
  projectId: "app-colegio-50120",
  storageBucket: "app-colegio-50120.appspot.com",
  messagingSenderId: "123783749543",
  appId: "1:123783749543:web:70dcd238d7f3b72ba2a082"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)