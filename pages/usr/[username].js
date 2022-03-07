import { useContext, useEffect, useState, createContext, useLayoutEffect} from "react"
import Menu from "../../components/Menu"
import UserAsset from '../../components/UserAsset'
import CryptoAsset from '../../components/CryptoAssest'
import { UsersContext } from "../../components/UsersContext"
import { useRouter }  from "next/router"
import NetWorth from "../../components/NetWorth"
import RealestateAssest from "../../components/RealestateAssest"
import Debt from "../../components/Debt"




export default function UserHome(){
  const router = useRouter()
  // TODO: each net worth components needs a piece of state and they will all get passed as props to net worth
  // they will all also update this state by being passes the set state function.
const [stockTotalsValue, setStockTotalValue] = useState(0)
const [cryptoTotalValue, setCryptoTotalValue] = useState(0)
const [realestateTotalsValue, setRealestateTotalValue] = useState(0)
const [debtTotalsValue, setDebtTotalValue] = useState(0)

const user = useContext(UsersContext)
const handleStockSubmit = (e) =>{
  // sends login data to api update user state
  e.preventDefault()
  router.push(`/usr/${user}/addstock`)
}
const handleCryptoSubmit = (e) =>{
  e.preventDefault()
  router.push(`/usr/${user}/addCrypto`)
}
const handleRealestateSubmit = (e) =>{
  e.preventDefault()
  router.push(`/usr/${user}/addRealestate`)
}
//get the net worth state from 

// checks for user
useEffect(()=>{
  if(localStorage.username == '' || localStorage.username == undefined){
   return router.push(`/`)
  }else{
   
  }
},[user])

// inside of main will be all of the assets. Each asses will return a block in div form
  return (
    <>
    <nav>
    <Menu></Menu>
    </nav>
    
    <main>
    <div className="grid grid-cols-3 ">
    
    <NetWorth stockTotalsValue={stockTotalsValue} cryptoTotalValue={cryptoTotalValue} realestateTotalsValue={realestateTotalsValue}></NetWorth>

    <UserAsset value={user} setStockTotalValue={setStockTotalValue}></UserAsset>

    <CryptoAsset setCryptoTotalValue={setCryptoTotalValue}></CryptoAsset>

    <RealestateAssest setRealestateTotalValue={setRealestateTotalValue}></RealestateAssest>
    
    <div className="flex justify-center" ><button className="box-border p-1 m-2 border-4 rounded-lg" onClick={handleStockSubmit}>Add Stock/ETF</button></div>

    <div className="flex justify-center" ><button className="box-border p-1 m-2 border-4 rounded-lg" onClick={handleCryptoSubmit}>Add Crypto</button></div>

    <div className="flex justify-center" ><button className="box-border p-1 m-2 border-4 rounded-lg" onClick={handleRealestateSubmit}>add Realestate</button></div>

    <Debt setDebtTotalValue={setDebtTotalValue}></Debt>

    </div>
    </main>
    </>
  )
}