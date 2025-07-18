// src/firebaseAuth.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3-hAAXHX0Okz981TnxELgyK_Vz87_0uM",
  authDomain: "clinicbooking-cf994.firebaseapp.com",
  projectId: "clinicbooking-cf994",
  storageBucket: "clinicbooking-cf994.appspot.com",
  messagingSenderId: "981155539576",
  appId: "1:981155539576:web:fe7c4a7352f2f20fc1db8d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
