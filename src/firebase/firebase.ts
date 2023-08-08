
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCqwj5Em6hRvnFY_Lzejqs8pXfXAG4Iv70",
  authDomain: "book-store-ebabe.firebaseapp.com",
  projectId: "book-store-ebabe",
  storageBucket: "book-store-ebabe.appspot.com",
  messagingSenderId: "371386780927",
  appId: "1:371386780927:web:324cacb7ed67ed897090ca"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
