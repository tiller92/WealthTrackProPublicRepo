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
import {AiFillPlusCircle,AiOutlineReload} from 'react-icons/ai'
import HowToBox from "../../components/HowToBox"
import Cash from '../../components/Cash'
 
//TODO: This will load the data you needfot the intail load that is rendering then the data will be refreshed by the use when they add things. it doesnt work
export async function getServerSideProps({query}){
 const {username} = query


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
          cash:true,
      }
  })
  return user
}
 const user = main()

 
 const stocksList = setListStocks(await user)
 function setListStocks(data){
   if(data){
   const sList = [...data.stocks]
   return JSON.stringify(sList)
   }else{
     return JSON.stringify([])
   }
 }
 
//TODO: you need make a server loaded list for each prop needed and drill them down. Use user asset as the example
 const cryptoList = setListCrypto(await user)
 function setListCrypto(data){
   if(data){
   const sList = [...data.crypto]
   return JSON.stringify(sList)
   }else{
     return JSON.stringify([])
   }
 }
 const realestateList = setRealestateList(await user)
 function setRealestateList(data){
   if(data){
   const sList = [...data.realestate]
   return  JSON.stringify(sList)
   }else{
     return JSON.stringify([])
   }
 }
 const debtList = setListDebt(await user)
 function setListDebt(data){
   if(data){
   const sList = [...data.debt]
   return JSON.stringify(sList)
   }else{
     return JSON.stringify([])
   }
 }
 const cashList = setListCash(await user)
 function setListCash(data){
   if(data){
   const sList = [...data.cash]
   console.log(sList)
   return JSON.stringify(sList)
   }else{
     return JSON.stringify([])
   }
 }
  return {
    props: {stocksList, cryptoList, realestateList, debtList, cashList},
  }
}


export default function UserHome({stocksList, cryptoList,realestateList, debtList, cashList}){
const router = useRouter()
const [stockTotalsValue, setStockTotalValue] = useState(0)
const [cryptoTotalValue, setCryptoTotalValue] = useState(0)
const [realestateTotalsValue, setRealestateTotalValue] = useState(0)
const [debtTotalsValue, setDebtTotalValue] = useState(0)
const [cashTotalsValue, setCashTotalValue] = useState(0)
const user = useContext(UsersContext)
const initStocksFromServer = JSON.parse(stocksList)
const initCryptoFromServer = JSON.parse(cryptoList)
const initRealestateFromServer = JSON.parse(realestateList)
const initDebtFromServer = JSON.parse(debtList)
const initCashFromServer = JSON.parse(cashList)


const [toggle, setToggle] = useState(false)
const handleToggle = ()=>{
  setToggle(!toggle)
}

const handleReload = ()=>{ window.location.reload() }
const handleStockSubmit = (e) =>{
  e.preventDefault()
if(user){
  router.push(`/usr/${user}/addstock`)
}else{
  window.location.reload()
}
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
const handleCashSubmit = (e) =>{
  e.preventDefault()
  router.push(`/usr/${user}/addCash`)
}

//get the net worth state from 

// checks for user
useEffect(()=>{
  if(localStorage.username == '' || localStorage.username == undefined){
   return router.push(`/`)
  }
},[])

  return (
    <>
    <div className="bg-gradient-to-r from-main-bg to-secondary w-full  h-full">
    <nav>
    <Menu></Menu>
    </nav>
    <main className="flex justify-center h-5/6 m-5 ">
    <div className=" h-full  w-11/12">
    <NetWorth  debtTotalsValue={debtTotalsValue} stockTotalsValue={stockTotalsValue} cryptoTotalValue=
    {cryptoTotalValue} realestateTotalsValue={realestateTotalsValue} cashTotalsValue={cashTotalsValue}></NetWorth>

    <div className="flex justify-center float-left flex-col w-4/12">
    <UserAsset stocksList={initStocksFromServer} value={user} setStockTotalValue={setStockTotalValue}></UserAsset>
    <div className="flex justify-center" ><button className="box-border p-1 m-2 shadow-lg rounded-lg bg-emerald-400 flex justify-center" onClick={handleStockSubmit}><AiFillPlusCircle size={25} /> Stock/ETF</button></div>
    </div>

    <div className=" grid grid-cols-2 h-auto w-auto">
    <CryptoAsset cryptoList={initCryptoFromServer} setCryptoTotalValue={setCryptoTotalValue}>
    </CryptoAsset>
    <RealestateAssest realestateList={initRealestateFromServer} setRealestateTotalValue={setRealestateTotalValue}>
    </RealestateAssest>
    <div className="flex justify-center" >
    <button className="box-border p-1 m-2  shadow-lg rounded-lg bg-emerald-400 flex justify-center " onClick={handleCryptoSubmit}><AiFillPlusCircle size={25} />Crypto</button>
    </div>
    <div className="flex justify-center" >
      <button className="box-border p-1 m-2  shadow-lg rounded-lg bg-emerald-400 flex justify-center  " onClick={handleRealestateSubmit}>
        <AiFillPlusCircle size={25} /> Realestate</button>
        </div>
    <div>
    <Debt debtList={initDebtFromServer} setDebtTotalValue={setDebtTotalValue}>
    </Debt>
    </div>
    <div>
    <Cash setCashTotalValue={setCashTotalValue} cashList={initCashFromServer} ></Cash>
   </div>
    <div className="flex justify-center col-span-1" >
      <button className="box-border p-1 m-2  shadow-lg  rounded-lg bg-emerald-400 flex justify-center " onClick={handleDebtSubmit}><AiFillPlusCircle size={25} /> Debt</button>
   </div>
  
   <div className="flex justify-center col-span-1" >
      <button className="box-border p-1 m-2  shadow-lg  rounded-lg bg-emerald-400 flex justify-center " onClick={handleCashSubmit}><AiFillPlusCircle size={25} /> Cash</button>
   </div>
    </div>
    <div className="relative flex justify-center m-5 top-10">
            <button onClick={handleToggle} ><HowToBox
            toggle={toggle}></HowToBox></button>
          </div>
    </div>
    </main>
    </div>
    </>
  )

}
