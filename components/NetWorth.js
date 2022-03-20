import { useContext, useEffect, useState } from "react"
import { NetWorthContext } from "./NetWorthContext"
import {round} from '../lib/round'
import {AiOutlineReload} from 'react-icons/ai'


export default function NetWorth({stockTotalsValue,cryptoTotalValue, realestateTotalsValue,debtTotalsValue}){
  // get the totals from all the other compenents. Want this to rerender with any change in other components

  const netWorth = (stockTotalsValue + cryptoTotalValue + realestateTotalsValue) - (debtTotalsValue)
  
  const roundWorth = round(netWorth,2)
  
  const handleReload = ()=>{ window.location.reload() }

  return ( 
  <>
  <div className='col-span-1  h-auto flex justify-center m-5'>
  <button onClick={handleReload} className='rounded-full p-3 m-2'><AiOutlineReload size={28} /></button>
    <p className='border border-box p-4 bg-emerald-200 rounded-lg'>Net Worth: ${roundWorth}</p>
  </div>
  </>
  )

}