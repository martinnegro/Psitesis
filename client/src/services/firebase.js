import firebase from 'firebase/app';
import 'firebase/storage';
//const { firebaseConfig } = process.env;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBtdO29jlJ1MhGI730V12oUD0n-8WqbVCU",
  authDomain: "psitesis-4ac10.firebaseapp.com",
  projectId: "psitesis-4ac10",
  storageBucket: "psitesis-4ac10.appspot.com",
  messagingSenderId: "643065385730",
  appId: "1:643065385730:web:881a3dc2aed88047b8a81b"
  }
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const fbStorage = firebase.storage()

export { fbStorage }