import firebase from "firebase/compat/app";
import "firebase/compat/database";

//import { initializeApp } from 'firebase/app';
//import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDXr-2WgHrwMVM-vMqWL6Stx5eW-n8TWzw",

  authDomain: "schemes-8c091.firebaseapp.com",

  projectId: "schemes-8c091",

  storageBucket: "schemes-8c091.appspot.com",

  messagingSenderId: "1045322872755",

  appId: "1:1045322872755:web:e404e71559bfe449f5fdc6"

};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();

//const app = initializeApp(firebaseConfig);
// Get a reference to the database service
//const database = getDatabase(app);