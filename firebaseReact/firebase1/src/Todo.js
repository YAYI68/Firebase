import React, {useEffect, useReducer} from 'react'
import axios from 'axios' 
import { ListGroup, ListGroupItem} from 'reactstrap';
import { Badge } from 'reactstrap';

const initialState = {
  loading:true,
  error:"",
  todos:[]
}

const reducer = (state, action) => {
    switch(action.type) {
      case "set_data":
        return{
          loading:false,
          error:"",
          todos: action.data
        }
      case "set_error":
        return {
          loading:false,
          error:"There are some error",
          todos: []
        }
        default:
          return state
    }
}

function Todo() {
  const [state,dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos")
    .then(res=>{
      console.log(res.data)
      dispatch({type:"set_data",data:res.data})
    })
    .catch(err=>{
      dispatch({type:'set_error'})
    })
  }, []);

  const listmarkup = <div>List Markup</div> 
  const completed = (<Badge color="success">complete</Badge>)
  const incomplete = (<Badge color="danger">incomplete</Badge>)
  return (
    <div className="App">
        {state.loading?"loading":(state.error?state.error:listmarkup)}  
        <ListGroup>
          {state.todos.map(todo=><ListGroupItem key={todo.id}>{todo.title}  {todo.completed?completed:incomplete}</ListGroupItem>
          )}
        </ListGroup>   
    </div>
  );
}

export default Todo;
