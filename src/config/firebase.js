import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "hidden-object-game-fe969.firebaseapp.com",
  databaseURL: "https://hidden-object-game-fe969.firebaseio.com",
  projectId: "hidden-object-game-fe969",
  storageBucket: "hidden-object-game-fe969.appspot.com",
  messagingSenderId: "927614987241",
  appId: "1:927614987241:web:708a1360b26eadcc22b978",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
