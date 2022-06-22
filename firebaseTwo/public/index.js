
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore,collection,getDocs,getDoc } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyCxdbtSPKd9SqWWsLvmkH4CI4B5_ytcQQI",
  authDomain: "fir-getstarted-6a054.firebaseapp.com",
  projectId: "fir-getstarted-6a054",
  storageBucket: "fir-getstarted-6a054.appspot.com",
  messagingSenderId: "766879841371",
  appId: "1:766879841371:web:e0122a540d6c079aed937e",
  measurementId: "G-G1K1RTMXG1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

// Detect auth state
onAuthStateChanged(auth, user=>{
    if(user === null){
        console.log("No user found")
    }
    else console.log('We have a user')
})
