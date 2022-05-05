import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { round } from "../lib/round"
import { UsersContext } from "./UsersContext"
import EditDebtInLine from '../components/EditDebtInLine'
import DeleteDebt from '../components/DeleteDebt'

export default function Debt({setDebtTotalValue, debtList}){
  const user = useContext(UsersContext)
  const [debt, setDebt] = useState([])
  const [portfolio, setPortfolio] = useState(0)
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(()=>{
   if(user && firstLoad == false){
     async function getDebt(){
       const res = await axios.get(`/api/${user}`)
      setDebt(res.data.debt)
     }
     getDebt()
   }else{
     setDebt(debtList)
     setFirstLoad(false)
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

  // if(!debt){
  //   return (
  //     <>
  //     <div className='col-span-1 box-content border-4' >
  //     <p>add debt</p>
  //     </div>
  //     </>
  //   )
  // }
  
  return ( 
    <>
    <div className='col-span-1 box-content  shadow-lg shadow-slate-400 border-2 m-3 rounded-md' >
      <div className="asset p-4">
      <ul className="ml-4 flex justify-center">
        <li key={1}>Total Debt: ${portfolio}</li>
      </ul>
      <h1>Debt:</h1>
      <ul >
        {debt.map(val => (
          <>
          <li className="asset" key={val.id +8}>{val.type }
          <DeleteDebt key={val.id+10} id={val.id} ></DeleteDebt>
          <EditDebtInLine key={val.id+11} id={val.id} ></EditDebtInLine>
           </li>
          <li key={val.id +1} className="asset ml-1" >${val.debt}</li>
          <li key={val.id +2} className="asset ml-1" > {val.interest}% </li>
          </>
        ))}
      </ul>
    </div>
    </div>
    </>
    )
}