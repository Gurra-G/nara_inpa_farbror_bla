import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA16X0S81Bh8ASsmB2jEsm0wIeK-A25fBM",
  authDomain: "nara-inpa-farbor-bla.firebaseapp.com",
  databaseURL: "https://nara-inpa-farbor-bla.firebaseio.com",
  projectId: "nara-inpa-farbor-bla",
  storageBucket: "nara-inpa-farbor-bla.appspot.com",
  messagingSenderId: "985507215515",
  appId: "1:985507215515:web:4ef26028bdbba2f711ee3e",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.firestore();
export default firebase;
