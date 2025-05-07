import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyA6flRLZc_uhDy_waPJYmv0ff5CrsKWSCs",
  authDomain: "updownphotos-e3644.firebaseapp.com",
  projectId: "updownphotos-e3644",
  storageBucket: "updownphotos-e3644.firebasestorage.app",
  messagingSenderId: "1027135331150",
  appId: "1:1027135331150:web:cf7befb01d4bdcc937dc1f",
  measurementId: "G-ZMFVVYF2XT"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);