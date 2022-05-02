import  firebase from "firebase/compat/app";
import "firebase/compat/database";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAQd2xZWTLOUdwaoyv4FDU8-glUkm9rnu8",
    authDomain: "contact-form-d8d2b.firebaseapp.com",
    projectId: "contact-form-d8d2b",
    storageBucket: "contact-form-d8d2b.appspot.com",
    messagingSenderId: "892812037881",
    appId: "1:892812037881:web:fa3935fe1a0a0232fcdc28"
  };

  const fireDb= firebase.initializeApp(firebaseConfig);
  export default fireDb.database().ref();