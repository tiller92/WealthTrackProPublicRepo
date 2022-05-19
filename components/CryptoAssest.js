import axios from "axios"
import { useContext, useEffect, useState } from "react"
import {UsersContext} from '../components/UsersContext'
import {ALPHA_API_KEY} from '../secret'
import {getTimeAndDate} from '../lib/timeAndDate'
import { NetWorthContext } from '../components/NetWorthContext';
import{round} from '../lib/round'
import DeleteAsset from '../components/DeleteAsset'
import EditCryptoInLine from '../components/EditCryptoInLine'
import DeleteCrypto from "../components/DeleteCrypto"



async function getPrice(arr){
  //TODO: use the alpha vantage API to get the price of the ticker list that is passed to it
  const date = await getTimeAndDate()
  const total = []
  try{
  for(let stock in arr){
    let res = await axios.get( `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${arr[stock].name}&market=USD&apikey=${ALPHA_API_KEY}'`)
    let obj = {
            id:arr[stock].id,
            ticker: arr[stock].name,
            price:round(res['data']['Time Series (Digital Currency Daily)'][date]['4a. close (USD)'],2),
            shares:arr[stock].shares,
            stockValue:0,
          }
          total.push(obj)
  }
}catch(err){
  console.log(err)
}
  for(let i of total){
      i.stockValue = round(i.price * i.shares,2)
  }
  return total
  }

function Assets({setCryptoTotalValue,cryptoList ,user}){
  
  // Loads the users stocks to ETFs and then gets the current price
  const [userTotals, setUserTotals] = useState([])
  const totalCrypto = (num)=>{setCryptoTotalValue(num)}
  const [info, setInfo] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [stocks, setStocks] = useState([])
  const [portfolio, setPortfolio] = useState(0)
  const [firstLoad, setFirstLoad] = useState(true)
 
  useEffect(()=>{
  async function get(){
  if(user){
  const res = await axios.get(`/api/${user}` )
  const tickers = res.data.crypto
  setUserTotals(await getPrice(tickers))
  setInfo(res.data.username)
  setStocks(res.data.crypto)
  setLoading(false)
  }else{  
    setUserTotals(cryptoList)
  }
}
get()
},[user])

useEffect(()=>{
  let CryptoValue = 0
  for(let i in userTotals){
    CryptoValue += userTotals[i].stockValue
  }
  let cryptoRound = round(CryptoValue,2)
  totalCrypto(cryptoRound)
  setPortfolio(cryptoRound)
}
,[user,userTotals])


//TODO: make this a table. Need to have an edit option
  return (
    <>
    <div className="asset box-content shadow-lg shadow-slate-400 p-2 border-2 rounded-md m-3">
    <ul className="ml-4 flex justify-center">
      <li>Total Portfolio Value: ${portfolio}</li>
    </ul>
    <h1>Crypto Assets:</h1>
    <ul className="asset">
      {userTotals.map(stock => (
        <ul key={stock.id}>
        <li key={stock.id +1}>
          {stock.ticker}
          <DeleteCrypto key={stock.id+2} id={stock.id} user={user}></DeleteCrypto>
        <EditCryptoInLine key={stock.id +4}id={stock.id} ></EditCryptoInLine>
          </li>
          <li key={stock.id+ 5} className="ml-2">
           Shares: {stock.shares}
          </li>
          <li key={stock.id+ 6} className="ml-2">
            Price: ${stock.price} 
            </li>
            <li key={stock.id+7}className="ml-2">
            Total: ${stock.stockValue}
             </li>
             </ul>
      ))}
    </ul>
    </div>
    </>
  )
      }


export default Assets