import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCDs3bd_VweYunfCK0Fb9ssfFicboaHdo",
  authDomain: "patienthistorysystem-8a6bc.firebaseapp.com",
  databaseURL: "https://patienthistorysystem-8a6bc-default-rtdb.firebaseio.com",
  projectId: "patienthistorysystem-8a6bc",
  storageBucket: "patienthistorysystem-8a6bc.appspot.com",
  messagingSenderId: "415741641805",
  appId: "1:415741641805:web:1c996be3fd313c13b40804"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
