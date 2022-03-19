import { useContext, useEffect, useState, createContext, useLayoutEffect} from "react"
import Menu from "../../components/Menu"
import UserAsset from '../../components/UserAsset'
import CryptoAsset from '../../components/CryptoAssest'
import { UsersContext } from "../../components/UsersContext"
import { useRouter }  from "next/router"
import NetWorth from "../../components/NetWorth"
import RealestateAssest from "../../components/RealestateAssest"
import Debt from "../../components/Debt"
import axios from "axios"
import prisma from "../../lib/prismaExport"

//TODO: This will load the data you needfot the intail load that is rendering then the data will be refreshed by the use when they add things. it doesnt work
export async function getServerSideProps({query}){
 const {username} = query
 console.log(username, 'server side')
 async function main() {
  // ... you will write your Prisma Client queries here
  const user = await prisma.user.findUnique({
      where: {
          username: username,
      },
      include: {
          stocks: true,
          crypto: true,
          realestate: true,
          debt: true,
      }
  })
 
  return user
}
 const user = main()
 const stocksList = setListStocks(await user)
 function setListStocks(data){
   const sList = [...data.stocks]
   return JSON.stringify(sList)
 }
//TODO: you need make a server loaded list for each prop needed and drill them down. Use user asset as the example
 const cryptoList = setListCrypto(await user)
 function setListCrypto(data){
   const sList = [...data.crypto]
   return JSON.stringify(sList)
 }
 const realestateList = setRealestateList(await user)
 function setRealestateList(data){
   const sList = [...data.realestate]
   return  JSON.stringify(sList)
 }
 const debtList = setListDebt(await user)
 function setListDebt(data){
   const sList = [...data.debt]
   return JSON.stringify(sList)
 }
  return {
    props: {stocksList, cryptoList, realestateList, debtList},
  }
}


export default function UserHome({stocksList, cryptoList,realestateList, debtList}){
const router = useRouter()
const [stockTotalsValue, setStockTotalValue] = useState(0)
const [cryptoTotalValue, setCryptoTotalValue] = useState(0)
const [realestateTotalsValue, setRealestateTotalValue] = useState(0)
const [debtTotalsValue, setDebtTotalValue] = useState(0)
const user = useContext(UsersContext)
const initStocksFromServer = JSON.parse(stocksList)
const initCryptoFromServer = JSON.parse(cryptoList)
const initRealestateFromServer = JSON.parse(realestateList)
const initDebtFromServer = JSON.parse(debtList)

const handleStockSubmit = (e) =>{
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
    <UserAsset stocksList={initStocksFromServer} value={user} setStockTotalValue={setStockTotalValue}></UserAsset>
    <div className="flex justify-center" ><button className="box-border p-1 m-2 border-1 shadow-lg  rounded-lg bg-emerald-400" onClick={handleStockSubmit}>Add Stock/ETF</button></div>
    </div>

    <div className="grid grid-cols-2 h-100 ">
    <CryptoAsset cryptoList={initCryptoFromServer} setCryptoTotalValue={setCryptoTotalValue}></CryptoAsset>
    <RealestateAssest realestateList={initRealestateFromServer} setRealestateTotalValue={setRealestateTotalValue}></RealestateAssest>
    <div className="flex justify-center" ><button className="box-border p-1 m-2 border-1 shadow-lg rounded-lg bg-emerald-400" onClick={handleCryptoSubmit}>Add Crypto</button></div>
    <div className="flex justify-center" ><button className="box-border p-1 m-2 border-2 shadow-lg rounded-lg bg-emerald-400 " onClick={handleRealestateSubmit}>add Realestate</button></div>
    <Debt debtList={initDebtFromServer} setDebtTotalValue={setDebtTotalValue}></Debt>
    <div className="flex justify-center col-span-2" ><button className="box-border p-1 m-2 border-1 shadow-lg  rounded-lg bg-emerald-400" onClick={handleDebtSubmit}>add Debt</button></div>

    </div>
    </div>
    </main>
    </>
  )

}
