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
  
  user ? router.push(`/usr/${user}/addstock`) : console.log('no user')
  
}
const handleCryptoSubmit = (e) =>{
  e.preventDefault()
 
  router.push(`/usr/${user}/addCrypto`)
}
const handleRealestateSubmit = (e) =>{
  e.preventDefault()
  router.push(`/usr/${user}/addRealestate`)
}
const handleDebtSubmit = (e) =>{
  e.preventDefault()
  router.push(`/usr/${user}/addDebt`)
}

//get the net worth state from 

// checks for user
useEffect(()=>{
  if(localStorage.username == '' || localStorage.username == undefined){
   return router.push(`/`)
  }
},[user])

  return (
    <>
    <nav>
    <Menu></Menu>
    </nav>
    <main className="flex justify-center">
    <div className="profile-home  h-auto  w-10/12 ">
    <NetWorth debtTotalsValue={debtTotalsValue} stockTotalsValue={stockTotalsValue} cryptoTotalValue=
    {cryptoTotalValue} realestateTotalsValue={realestateTotalsValue}></NetWorth>

    <div className="grid box box-content border-1  flex justify-center float-left">
    <UserAsset value={user} setStockTotalValue={setStockTotalValue}></UserAsset>
    <div className="flex justify-center" ><button className="box-border p-1 m-2 border-1 shadow-lg  rounded-lg bg-emerald-400" onClick={handleStockSubmit}>Add Stock/ETF</button></div>
    </div>

    <div className="grid grid-cols-2 h-100 ">
    <CryptoAsset setCryptoTotalValue={setCryptoTotalValue}></CryptoAsset>
    <RealestateAssest setRealestateTotalValue={setRealestateTotalValue}></RealestateAssest>
    <div className="flex justify-center" ><button className="box-border p-1 m-2 border-1 shadow-lg rounded-lg bg-emerald-400" onClick={handleCryptoSubmit}>Add Crypto</button></div>
    <div className="flex justify-center" ><button className="box-border p-1 m-2 border-2 shadow-lg rounded-lg bg-emerald-400 " onClick={handleRealestateSubmit}>add Realestate</button></div>
    <Debt setDebtTotalValue={setDebtTotalValue}></Debt>
    <div className="flex justify-center col-span-2" ><button className="box-border p-1 m-2 border-1 shadow-lg  rounded-lg bg-emerald-400" onClick={handleDebtSubmit}>add Debt</button></div>

    </div>
    </div>
    </main>
    </>
  )

}
