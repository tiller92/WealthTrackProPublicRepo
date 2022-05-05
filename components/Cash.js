import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { round } from "../lib/round"
import { UsersContext } from "./UsersContext"
import EditCashInLine from '../components/EditCashInLine'
import DeleteCash from '../components/DeleteCash'



// pass in cash list and update SSR
export default function Debt({setCashTotalValue, cashList}){
  const user = useContext(UsersContext)
  const [cash, setCash] = useState([])
  const [portfolio, setPortfolio] = useState(0)
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(()=>{
   if(user && firstLoad == false){
     async function getCash(){
       const res = await axios.get(`/api/${user}`)
       console.log(res)
      setCash(res.data.cash)
     }
     getCash()
   }else{
     setCash(cashList)
     setFirstLoad(false)
   }
  },[])

  
  useEffect(()=>{
    // add up debt from db
    let cashTotal = 0
    for(let i in cash){
      cashTotal += parseFloat(cash[i].amount)
    }
    let cashRound = round(cashTotal,2)
    setCashTotalValue(cashRound)
    setPortfolio(cashRound)
  },[cash,setCash])

  if(!cash){
    return (
      <>
      <div className='col-span-1 box-content border-4' >
      <p>add Cash</p>
      </div>
      </>
    )
  }else{
  return ( 
    <>
    <div className='col-span-1 box-content shadow-lg shadow-slate-400 border-2 m-3 rounded-md' >
      <div className="asset p-4">
      <ul className="ml-4 flex justify-center">
        <li key={1}>Total Cash: ${portfolio}</li>
      </ul>
      <h1>Cash:</h1>
      <ul >
        {cash.map(val => (
          <>
          <li className="asset" key={val.id +8}>{val.type }
          <DeleteCash key={val.id+10} id={val.id} ></DeleteCash>
          <EditCashInLine key={val.id+11} id={val.id} ></EditCashInLine>
           </li>
          <li key={val.id +1} className="asset ml-1" >${val.amount}</li>
      
          </>
        ))}
      </ul>
    </div>
    </div>
    </>
    )
}
}