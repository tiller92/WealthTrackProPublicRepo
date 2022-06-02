import { UsersContext } from "./UsersContext"
import { useContext, useState, useEffect } from "react"
import axios from "axios"
import {round} from '../lib/round'
import DeleteRealestate from '../components/DeleteRealestate'
import EditRealestateInLine from '../components/EditRealestateInLine'

export default function Realestate({setRealestateTotalValue,realestateList}){
  const user = useContext(UsersContext)
  const [realestate,setRealestate] = useState([])
  const [portfolio, setPortfolio] = useState(0)
  const [firstLoad, setFirstLoad] = useState(true)
  


  useEffect(()=>{
  if(user && firstLoad == false){
  async function getUserRealestate(){
    const res = await axios.get(`/api/${user}`)
    if(res.data.realestate){
      setRealestate(res.data.realestate)
    }
  }
  getUserRealestate()
}else{
  setRealestate(realestateList)
  setFirstLoad(false)
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
     <div className="asset box-content  p-2 border m-3 rounded-md">
     <ul className="ml-4 flex justify-center">
      <li>Total Value: ${portfolio}</li>
    </ul>
    <h1>Realestate: </h1>
    <ul className="asset">
      {realestate.map(data => (
        <li key={data.id}>{data.name}: ${data.value}
        <DeleteRealestate id={data.id}></DeleteRealestate>
        <EditRealestateInLine id={data.id} ></EditRealestateInLine>
        
          </li>
      ))}
    </ul>
 
    </div>
    </>
  )
}

