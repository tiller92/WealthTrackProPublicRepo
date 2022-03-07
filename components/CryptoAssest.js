import axios from "axios"
import { useContext, useEffect, useState } from "react"
import {UsersContext} from '../components/UsersContext'
import {ALPHA_API_KEY} from '../secret'
import {getTimeAndDate} from '../lib/timeAndDate'
import { NetWorthContext } from '../components/NetWorthContext';



async function getPrice(arr){
  //TODO: use the alpha vantage API to get the price of the ticker list that is passed to it
  const date = getTimeAndDate()
  const total = []
  for(let stock in arr){
    let res = await axios.get( `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${arr[stock].name}&market=USD&apikey=${ALPHA_API_KEY}'`)
    let obj = {
            ticker: arr[stock].name,
            price:res['data']['Time Series (Digital Currency Daily)'][date]['4a. close (USD)'],
            shares:arr[stock].shares,
            stockValue:0,
          }
          total.push(obj)
  }
  for(let i of total){
      i.stockValue = i.price * i.shares 
  }
  return total
  }

function Assets({setCryptoTotalValue}){
  // Loads the users stocks to ETFs and then gets the current price
  const user = useContext(UsersContext)

  const totalCrypto = (num)=>{setCryptoTotalValue(num)}
 
  const [info, setInfo] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [stocks, setStocks] = useState([])
  const [userTotals, setUserTotals] = useState([])

  const currentNet = useContext(NetWorthContext)
 
  useEffect(()=>{
  async function get(){
  if(user){
  const res = await axios.get(`/api/${user}` )
  const tickers = res.data.crypto
  setUserTotals(await getPrice(tickers))
  setInfo(res.data.username)
  setStocks(res.data.crypto)
  setLoading(false)
 
  }
}
get()
},[user])

useEffect(()=>{
  currentNet.test = 'changed'
  let CryptoValue = 0
  for(let i in userTotals){
    // add up all stocks and pass it to networth context
    CryptoValue += userTotals[i].stockValue
  }
  currentNet.cryptoTotal = CryptoValue
  totalCrypto(CryptoValue)
}
,[setUserTotals,userTotals])


//TODO: make this a table. Need to have an edit option
  return (
    <>
    <div className="box-border h-64 w-128 p-2 border-2 flex justify-between">
    <h1>{info} Crypto Assets:</h1>
    <ul>
      {userTotals.map(stock => (
        <li key={userTotals[stock.id]} >Ticker: {stock.ticker} #Shares: {stock.shares} Price: ${stock.price} Total: ${stock.stockValue} </li>
      ))}
    </ul>
    </div>
    </>
  )
      }


export default Assets