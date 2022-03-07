import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { UsersContext } from "./UsersContext"

export default function Debt({setDebtTotalValue}){
  const user = useContext(UsersContext)
  const [debt, setDebt] = useState([])

  useEffect(()=>{
   if(user){
     async function getDebt(){
       const res = await axios.get(`/api/${user}`)
      console.log(res.data.debt)
      setDebt(res.data.debt)
     }
     getDebt()
   }
  },[user])


  useEffect(()=>{
    // add up debt from db
    let debtTotal = 0
    for(let i in debt){
      debtTotal += debt[i].debt
    }
    console.log(debtTotal)
    setDebtTotalValue(debtTotal)

  },[debt])
  
  return ( 
    <>
    <div className='col-span-1 box-border border-4 h-32' >
      <h1>{user} Debt:</h1>
      <ul>
        {debt.map(val => (
          <li key={val.id}>{val.type }: {val.debt} </li>
        ))}
      </ul>
      
    </div>
    </>
    )
}