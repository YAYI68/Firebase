import React,{useState, createContext, useEffect} from 'react';
import {onSnapshot,collection,getDocs } from "firebase/firestore";
import { allPostAndIds } from '../utility';
import { db } from '../firebaseConfig';
 
export const PostsContext = createContext()
 


export const PostsProvider = ({children}) => {
    const [posts,setPosts] = useState([])
    const postRef = collection(db,'posts')

    useEffect(() =>{
        getPosts()
    },[])


    const getPosts =  ()=>{
        onSnapshot (postRef,(data)=>{
           const posts = data.docs.map(allPostAndIds)
           setPosts(posts)
           console.log("post")
         })
       }


  return (
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  )
}
