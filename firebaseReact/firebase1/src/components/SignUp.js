import { createUserWithEmailAndPassword,updateProfile  } from 'firebase/auth';
import React,{useState} from 'react';
import { auth, createUserProfileDocument } from '../firebaseConfig';


export const SignUp = () => {
   const [displayName,setDisplayName] = useState('')
   const [email,setEmail]= useState('')
   const [password,setPassword] = useState('')

   const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("currentUser",auth.currentUser)
    try{
        const {user } = await createUserWithEmailAndPassword(auth,email,password)
           const authUser = await createUserProfileDocument(user, {displayName})
           console.log("authUser",authUser)
            updateProfile(user, {displayName}).then(()=>{
                console.log('Profile updated')
                console.log("updateUser",user)
              }).catch(err =>{
                  console.log(err.message)
               })  

    }
    catch (error){
        console.error(error)
    }
   }

  return (
    <div style={{marginTop:'2rem'}}  >   
        <form action="" onSubmit={handleSubmit}>
            <div>
            <input type="text"  placeholder="displayName" onChange={(e)=>setDisplayName(e.target.value)} />
            </div>
            <div>
            <input type="email"  placeholder="Email"  onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div>
            <input type="password" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div>
            <button>Sign Up</button>
            </div>
        </form>
    </div>
  )
}
