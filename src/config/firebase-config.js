import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfbdAzhXKt4Ei1YSv-WSMxd7MXu5KFj9I",
  authDomain: "picture-gallery-132b4.firebaseapp.com",
  projectId: "picture-gallery-132b4",
  storageBucket: "picture-gallery-132b4.appspot.com",
  messagingSenderId: "1034826030870",
  appId: "1:1034826030870:web:28a88fc19942e86ca5fa37",
  measurementId: "G-FX80LG01KC",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
