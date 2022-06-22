import React,{useEffect, useState} from 'react';
import { auth, provider,createUserProfileDocument} from '../firebaseConfig';
import { getAuth,signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,signOut,onAuthStateChanged  } from "firebase/auth";


export const SignIn = () => {
    const[email,setEmail] = useState('')
    const [password,setPassword] = useState('')

const loginWithGoogle = ()=>{ signInWithPopup(auth, provider)
       .then((result) => {
     const credential = GoogleAuthProvider.credentialFromResult(result);
     const token = credential.accessToken;
     const user = result.user;
      console.log({user})
      }).catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
     const email = error.customData.email;
     const credential = GoogleAuthProvider.credentialFromError(error)
     console.log({email,credential})
    });
   }

   useEffect(()=>{
    changeAuth()
   },[])
   const changeAuth = ()=>{
    onAuthStateChanged(auth,async(authUser)=>{
        console.log("auth",authUser)
     if(authUser){
        // const {user} = await createUserProfileDocument(authUser)    
        // console.log('user loged in ',user)
     }
     else{
        console.log("User signed out ")
     }
    })
}

const submitHandler = async(e)=>{
    e.preventDefault();
    try {
        const {user} = await signInWithEmailAndPassword(auth,email,password)
        console.log('user',user)
       setEmail("")
       setPassword("")
    }
    catch (error) {
        console.log('error', error)
    }

}

const logOut = ()=>{
    signOut(auth).then(() => {
      console.log('User logged out')
    }).catch(err=>{
        console.log(err.message)
    })
}
  
  return (
    <div style={{marginTop:'2rem'}}>
        <form action="" onSubmit={submitHandler}>
            <div>
            <input type="email"  placeholder="Email"  onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div>
            <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div>
            <button >Sign In</button>
            </div>
        </form>
        {auth.currentUser ? 
        <button onClick={logOut}>Sign Out</button>:
        <button onClick={loginWithGoogle}>Sign in with Google</button>
        }
    </div>
  )
}
