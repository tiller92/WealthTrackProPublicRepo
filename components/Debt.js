import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { round } from "../lib/round"
import { UsersContext } from "./UsersContext"

export default function Debt({setDebtTotalValue}){
  const user = useContext(UsersContext)
  const [debt, setDebt] = useState([])
  const [portfolio, setPortfolio] = useState(0)

  useEffect(()=>{
   if(user){
     async function getDebt(){
      
       const res = await axios.get(`/api/${user}`)
      
      setDebt(res.data.debt)
     }
     getDebt()
   }
  },[user])

  
  useEffect(()=>{
    // add up debt from db
    let debtTotal = 0
    for(let i in debt){
      debtTotal += parseFloat(debt[i].debt)
    }
    let debtRound = round(debtTotal,2)
    setDebtTotalValue(debtRound)
    setPortfolio(debtRound)
  },[debt])

  if(!debt){
    return (
      <>
      <div className='col-span-1 box-content border-4' >
      <p>add debt</p>
      </div>
      </>
    )
  }
  
  return ( 
    <>
    <div className='col-span-2 box-content border-2 m-3 rounded-md' >
      <div className="asset p-4">
      <ul className="ml-4 flex justify-center">
        <li>Total Debt: ${portfolio}</li>
      </ul>
      <h1>Debt:</h1>
      <ul>
        {debt.map(val => (
          <li className="asset" key={val.id}>{val.type }: ${val.debt} </li>
        ))}
      </ul>
    </div>
    </div>
    </>
    )
}