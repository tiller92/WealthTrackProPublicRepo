import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { UsersContext } from "./UsersContext"

export default function Debt({setDebtTotalValue}){
  const user = useContext(UsersContext)
  const [debt, setDebt] = useState(0)

  useEffect(()=>{
   if(user){
     async function getDebt(){
       const res = await axios.get(`/api/${user}`)
      console.log(res)
     }
   }
  })


  // useEffect(()=>{
  //   // add up debt from db
  //   let debtTotat = 0
  //   for(let i in )
  //   setDebtTotalValue(debtTotal)

  // },[debt])
  
  return ( 
    <>
    <div className='col-span-3 box-border border-4 h-32' >
      <h1>{user} Debt:</h1>
      <ul>

      </ul>
      
    </div>
    </>
    )
}