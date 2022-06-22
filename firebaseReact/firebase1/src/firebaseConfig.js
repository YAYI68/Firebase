import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore ,doc,collection,setDoc,getDoc,getDocs} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth,GoogleAuthProvider ,updateProfile} from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyAFUT6hH0zaVvV3Y7Djjy7Phx_xTsG-lqc",

  authDomain: "blog-57a1c.firebaseapp.com",

  projectId: "blog-57a1c",

  storageBucket: "blog-57a1c.appspot.com",

  messagingSenderId: "250472069328",

  appId: "1:250472069328:web:02434c7de0f2dcab43c6d5",

  measurementId: "G-HC3GVTP4LK"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()

export const createUserProfileDocument = async (user,additionalData) =>{
    
     if(!user) return;
    //  Get a reference to the place in the database where a user profile might be.
     const userRef = doc(db,`users`,user.uid);
    //  Go and fect document from that location
    const snapshot = await getDoc(userRef)
    if(snapshot.exists){
       
      const { displayName,email,photoURL } = user
      const createdAt = new Date();
      try{
        await setDoc(userRef,{
          displayName,
          email,
          photoURL,
          createdAt,
          ...additionalData,
        })
      }
      catch(error){
        console.error(error.message)
      }
    }
    return getUserDocument(user.uid,additionalData)

}

export const getUserDocument = async(uid,additionalData)=>{
  if(!uid) return null;
  try{
    const userDocument =  doc(db,`users`,uid)
    const snapshot = await getDoc(userDocument)
   
    return{uid,...snapshot.data()}

  }
  catch(error){
     console.error(error.message)
  }
}
