import { UsersContext } from "./UsersContext"
import { useContext, useState, useEffect } from "react"
import axios from "axios"

export default function realestate({setRealestateTotalValue}){
  const user = useContext(UsersContext)
  const [realestate,setRealestate] = useState([])


  useEffect(()=>{
  if(user){
  async function getUserRealestate(){
    const res = await axios.get(`/api/${user}`)
  
    if(res.data.realestate){
      setRealestate(res.data.realestate)
    }else{
      console.log('realestate')
    }
    
  }
  getUserRealestate()
}
},[user])

useEffect(()=>{
  let totalReal = 0
  for(let i in realestate){
    totalReal += realestate[i].value
  }
  setRealestateTotalValue(totalReal)
},[realestate])

  return (
    <>
     <div className="box-border h-64 w-128 p-2 border-2 flex justify-between">
    <h1>realestate: </h1>
    <ul>
      {realestate.map(data => (
        <li key={data.id}>{data.name} :${data.value}</li>
      ))}
    </ul>
    </div>
    </>
  )
}

