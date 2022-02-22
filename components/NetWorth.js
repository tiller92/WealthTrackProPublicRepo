import { useContext } from "react"
import { NetWorthContext } from "./NetWorthContext"


export default function NetWorth({props}){
  // get the totals from all the other compenents. Want this to rerender with any change in other components
  const netWorth = useContext(NetWorthContext)
  
  const totals = netWorth.stocksTotal + netWorth.realestateTotal + netWorth.cryptoTotal - netWorth.debt
  console.log(totals)
 
  return ( 
  <>
  <div className='col-span-3 box-border border-4 h-32' >
    <h1>{totals}</h1>
  </div>
  </>
  )
}