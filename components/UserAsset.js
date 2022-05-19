import axios from "axios"
import { useContext, useEffect, useState } from "react"
import {UsersContext} from '../components/UsersContext'
import {ALPHA_API_KEY} from '../secret'
import {getTimeAndDate} from '../lib/timeAndDate'
import { NetWorthContext } from '../components/NetWorthContext';
import {round} from '../lib/round'
import DeleteAsset from '../components/DeleteAsset'
import EditInLine from './EditInLine'
import { useRouter } from 'next/router'



  async function getPrice(arr,date){
    //use the alpha vantage API to get the price of the ticker list that is passed to it
  
    const total = []
    try{
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
  }catch(err){
    console.log(err)
  }
    for(let i of total){
        i.stockValue = round(i.price * i.shares, 2)
    }
    return total

    }
  

function Assets({setStockTotalValue,stocksList, user}){
  // Loads the users stocks to ETFs and then gets the current price
  const [userTotals, setUserTotals] = useState([])
  const router = useRouter()
  const totalStocks = (num)=>{ setStockTotalValue(num)}
  const [info, setInfo] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [stocks, setStocks] = useState([])
  const [portfolio, setPortfolio] = useState(0)
  const [firstLoad, setFirstLoad] = useState(true)
 
//&& firstLoad == false add ti if
  useEffect(()=>{
  async function get(){ 
  const res = await axios.get(`/api/${user}`)
  const tickers = res.data.stocks
  const date = await getTimeAndDate()
  setUserTotals(await getPrice(tickers,date))
  setInfo(res.data.username)
  setStocks(res.data.stocks)
  setLoading(false)

}
get()
},[user])

useEffect(()=>{
  let allStocks = 0
  for(let i in userTotals){
    allStocks += userTotals[i].stockValue
  }
  let roundT = round(allStocks, 2)
  totalStocks(roundT)
  setPortfolio(roundT)
}

,[user,userTotals])

  return (
    <>
    <div  className="asset grid-flow-row w-auto shadow-lg shadow-slate-400 border-box w-11/12 p-2 border-2 rounded-md m-3 ">
    <ul  className="ml-4 flex justify-center">
      <li >Total Portfolio Value: ${portfolio}</li>
    </ul>
    <h1 >Stock Portfolio:</h1>
    <ul className="asset-list">
      {userTotals.map(stock => (
        <ul key={stock.id} >
        <li key={stock.id +1}  className="asset" >{stock.ticker} 
         <DeleteAsset key={stock.id +9}  user={user} id={stock.id}></DeleteAsset>
        <EditInLine  key={stock.id +10} id={stock.id} ></EditInLine>
        </li>
        <li key={stock.id +4 } className="asset ml-2">Shares: {stock.shares} </li>
       <li key={stock.id +5} className="asset ml-2"> Price: $ {stock.price} </li>
       <li  key={stock.id +6}className="asset ml-2">Total: $ {stock.stockValue} </li>

        </ul>
          ))}
    </ul>
    </div>
    </>
  )
      
      }
      


export default Assets