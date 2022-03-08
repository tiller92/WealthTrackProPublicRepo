import { UsersContext } from "./UsersContext"
import { useContext, useState, useEffect } from "react"
import axios from "axios"
import {round} from '../lib/round'

export default function realestate({setRealestateTotalValue}){
  const user = useContext(UsersContext)
  const [realestate,setRealestate] = useState([])
  const [portfolio, setPortfolio] = useState(0)


  useEffect(()=>{
  if(user){
  async function getUserRealestate(){
    const res = await axios.get(`/api/${user}`)
    if(res.data.realestate){
      setRealestate(res.data.realestate)
    }
  }
  getUserRealestate()
}
},[user])

useEffect(()=>{
  let totalReal = 0
  for(let i in realestate){
    totalReal += parseFloat(realestate[i].value)
  }
  let realestateRound = round(totalReal,2)
  setRealestateTotalValue(realestateRound)
  setPortfolio(realestateRound)
},[realestate])

  return (
    <>
     <div className="box-content p-2 border-2 m-3 rounded-md">
     <ul className="ml-4 flex justify-center">
      <li>Total Value: ${portfolio}</li>
    </ul>
    <h1>Realestate: </h1>
    <ul>
      {realestate.map(data => (
        <li key={data.id}>{data.name}: ${data.value}</li>
      ))}
    </ul>
 
    </div>
    </>
  )
}

