// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCqYCM2hqX25wfZDEn-nW__DChsCQ7erC8',
  authDomain: 'productsproject-669b2.firebaseapp.com',
  projectId: 'productsproject-669b2',
  storageBucket: 'productsproject-669b2.appspot.com',
  messagingSenderId: '295902515059',
  appId: '1:295902515059:web:8ca40c572f923f107aff06',
  databaseURL:
    'https://productsproject-669b2-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
