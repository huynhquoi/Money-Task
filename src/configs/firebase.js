import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwu2EH04-Z0wW9qFwjd8Y688We--g-a58",
  authDomain: "money-task-48b81.firebaseapp.com",
  projectId: "money-task-48b81",
  storageBucket: "money-task-48b81.appspot.com",
  messagingSenderId: "108418143555",
  appId: "1:108418143555:web:78be4588cd2521cf28cbf6",
  measurementId: "G-NCF5F2HZ94",
};

firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectAuth, projectFirestore, timestamp };
