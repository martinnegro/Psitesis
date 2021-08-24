import firebase from 'firebase/app';
import 'firebase/storage';
//const { firebaseConfig } = process.env;

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBv_ElZ4EyrvpvO8vxaZU0Bpax9Ge3L6wE",
    authDomain: "prueba-psitesis.firebaseapp.com",
    projectId: "prueba-psitesis",
    storageBucket: "prueba-psitesis.appspot.com",
    messagingSenderId: "172975466734",
    appId: "1:172975466734:web:1da21e720b909025aeebff"
  }
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const fbStorage = firebase.storage()

export { fbStorage }