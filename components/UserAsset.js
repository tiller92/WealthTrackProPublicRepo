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

    let res = await axios.get( `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${arr[stock].ticker}&apikey=${ALPHA_API_KEY}`)
    console.log(res['data']['Time Series (Daily)'])
    let obj = {
            ticker: arr[stock].ticker,
            price:res['data']['Time Series (Daily)'][date]['4. close'],
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

function Assets(){
  // Loads the users stocks to ETFs and then gets the current price
  const user = useContext(UsersContext)
  const [info, setInfo] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [stocks, setStocks] = useState([])
  const [userTotals, setUserTotals] = useState([])

  const currentNet = useContext(NetWorthContext)
  console.log(currentNet, 'before')
  
  useEffect(()=>{
  async function get(){
  if(user){
  const res = await axios.get(`/api/${user}` )
  const tickers = res.data.stocks
  setUserTotals(await getPrice(tickers))
  setInfo(res.data.username)
  setStocks(res.data.stocks)
  setLoading(false)
 
  }
}
get()
},[user])

useEffect(()=>{
  currentNet.test = 'changed'
  currentNet.stocksTotal = 10
  console.log(userTotals)},[userTotals,setUserTotals])

//TODO: make this a table. Need to have an edit option
  return (
    <>
    <div className="box-border h-64 w-128 p-2 border-2 flex justify-between">
    <h1>{info} Stock Portfolio:</h1>
    <ul>
      {userTotals.map(stock => (
        <li >Ticker: {stock.ticker} #Shares: {stock.shares} Price: ${stock.price} Total: ${stock.stockValue} </li>
      ))}
    </ul>
    </div>
    </>
  )
      }


export default Assets