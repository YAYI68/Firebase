import React,{useState,useEffect,createContext} from 'react'

export const userContext = createContext()

export const UsersProvider = ({children}) => {
    const [users,setUsers] = useState()



 useEffect(() => {


 },[])

  return (
    <userContext.Provider value={users}>{children}</userContext.Provider>
  )
}
