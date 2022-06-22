import React, {useEffect,useState,useContext} from 'react';
import { db,auth } from "../firebaseConfig";
import { doc, collection, getDocs,updateDoc ,getDoc, addDoc, deleteDoc,onSnapshot  } from "firebase/firestore";
import {onAuthStateChanged } from "firebase/auth";
import { PostsContext } from '../store/PostsProvider';


export const Post = () => {
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')

    const postRef = collection(db,'posts')
    const posts = useContext(PostsContext)

  const { displayName,uid,photoURL,email} = auth.currentUser || {}

  const belongToCurrentUser = (currentUser,postAuthor)=>{
    if(!currentUser) return ;
    return currentUser.uid === postAuthor.uid
  }

   const newPost = {
      title,
      content,
      user:{
        uid,
        displayName,
        email,
        photoURL
      }
   } 
   const submitHandler = async (e) => {
    e.preventDefault();
    await addDoc(postRef,newPost)
    setTitle("")
    setContent("")
   }

   const removePost = async(id)=>{
     await deleteDoc(doc(postRef,id))
   }

  

  return (
    <div>
     <form action="" style={{marginTop:'2rem'}}  onSubmit={submitHandler}>
        <div style={{marginTop:'1rem'}}>
         <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title} />
        </div>
        <div style={{marginTop:'1rem'}}>
         <input type="text" onChange={(e)=>setContent(e.target.value)} value={content} />
        </div>
         <button disabled={!title && !content } >Add Post</button>
    </form>   
    {posts ?  
      posts.map(post=>(
    <div key={post.id}  style={{margin:"2rem"}}>
    <h3>{post.title}</h3>
    <p>{post.content}</p>
    <button>star</button>
    <button >edit</button>
    <button onClick={()=>removePost(post.id)}>delete</button>
   </div>))
    :
    <h3>No post is found</h3>
   }

    </div>
  )
}


