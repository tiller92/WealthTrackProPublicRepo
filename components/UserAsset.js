import axios from "axios"
import { useContext, useEffect, useState } from "react"
import {UsersContext} from '../components/UsersContext'
import {ALPHA_API_KEY} from '../secret'
import {getTimeAndDate} from '../lib/timeAndDate'
import { NetWorthContext } from '../components/NetWorthContext';
import {round} from '../lib/round'
import DeleteAsset from '../components/DeleteAsset'
import EditInLine from './EditInLine'

  async function getPrice(arr){
    //TODO: use the alpha vantage API to get the price of the ticker list that is passed to it
    
    const date = getTimeAndDate()
    const total = []
    for(let stock in arr){
      let res = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${arr[stock].ticker}&apikey=${ALPHA_API_KEY}`)
      let obj = {
              id:arr[stock].id,
              ticker: arr[stock].ticker,
              price:round(res['data']['Time Series (Daily)'][date]['4. close'],2),
              shares:arr[stock].shares,
              stockValue:0,
            }
            total.push(obj)
    }
  
    for(let i of total){
        i.stockValue = round(i.price * i.shares, 2)
        
    }
    return total
    }

function Assets({setStockTotalValue , setRender}){
  // Loads the users stocks to ETFs and then gets the current price
  const user = useContext(UsersContext)

  const totalStocks = (num)=>{ setStockTotalValue(num)}
 
  const [info, setInfo] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [stocks, setStocks] = useState([])
  const [userTotals, setUserTotals] = useState([])
  const [portfolio, setPortfolio] = useState(0)

  const currentNet = useContext(NetWorthContext)
 
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
  let allStocks = 0
  for(let i in userTotals){
    // add up all stocks and pass it to networth context
    allStocks += userTotals[i].stockValue
  }
  currentNet.stocksTotal = allStocks
  let roundT = round(allStocks, 2)
  totalStocks(roundT)
  setPortfolio(roundT)
}

,[setUserTotals,userTotals])

//TODO: make this a table. Need to have an edit option
  return (
    <>
    <div className="asset grid-flow-row auto-rows-max  box-content p-2 border-2 rounded-md m-3 ">
    <ul className="ml-4 flex justify-center">
      <li>Total Portfolio Value: ${portfolio}</li>
    </ul>
    <h1>Stock Portfolio:</h1>
    <ul className="asset-list">
      {userTotals.map(stock => (
        <ul>
        <li className="asset" >{stock.ticker} 
         <DeleteAsset id={stock.id} user={user}></DeleteAsset>
        <EditInLine id={stock.id} ></EditInLine>
        </li>
        <li className="asset ml-2">Shares: {stock.shares} </li>
       <li className="asset ml-2"> Price: ${stock.price} </li>
       <li className="asset ml-2">Total: ${stock.stockValue} </li>
      
        </ul>
      ))}
    </ul>
    </div>
    </>
  )
      }


export default Assets