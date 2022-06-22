import React, {useEffect, useReducer} from 'react'
import axios from 'axios';
import './App.css';
import { Post } from './components/Post';
import { Login } from './components/Login';


function App() {
   

  return (
    <div className="App">
       <h2>Blog</h2>
        <Login />
        <Post />
    </div>
  );
}

export default App;
