import { useContext, useEffect, useState } from "react"
import { NetWorthContext } from "./NetWorthContext"
import {round} from '../lib/round'


export default function NetWorth({stockTotalsValue,cryptoTotalValue, realestateTotalsValue,debtTotalsValue}){
  // get the totals from all the other compenents. Want this to rerender with any change in other components

  const netWorth = (stockTotalsValue + cryptoTotalValue + realestateTotalsValue) - (debtTotalsValue)
  
  const roundWorth = round(netWorth,2)
  
  return ( 
  <>
  <div className='col-span-3  h-16 flex justify-center mt-5'>
    <h1 className="mt-3">Net Worth ${roundWorth}</h1>
    
  
  </div>
  </>
  )

}