// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjGStrGrdFzOEpp8J0emHS5BKcEMuGllY",
  authDomain: "chat-exercise-3d8e6.firebaseapp.com",
  projectId: "chat-exercise-3d8e6",
  storageBucket: "chat-exercise-3d8e6.appspot.com",
  messagingSenderId: "98391713629",
  appId: "1:98391713629:web:46d33c2f6b22a69f45eab4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
