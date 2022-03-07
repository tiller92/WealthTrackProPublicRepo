import { useContext, useEffect, useState } from "react"
import { NetWorthContext } from "./NetWorthContext"


export default function NetWorth({stockTotalsValue,cryptoTotalValue, realestateTotalsValue}){
  // get the totals from all the other compenents. Want this to rerender with any change in other components

  const netWorth = (stockTotalsValue + cryptoTotalValue + realestateTotalsValue)

  return ( 
  <>
  <div className='col-span-3 box-border border-4 h-32' >
    <h1>Net Worth  {netWorth}</h1>
  </div>
  </>
  )

}