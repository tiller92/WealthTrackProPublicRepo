import axios from "axios"
import { useContext, useEffect, useState } from "react"
import {UsersContext} from '../components/UsersContext'

const API_KEY = env('ALPHA_API_KEY')

async function getPrice(arr){
  //TODO: use the alpha vantage API to get the price of the ticker list that is passed to it
 let prices = []
  console.log(API_KEY)
  for(let i of arr){
    console.log(i)
  }
}


function Assets(){
  // Loads the users stocks to ETFs and then gets the current price
  const user = useContext(UsersContext)
  const [info, setInfo] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [stocks, setStocks] = useState([])

  
  useEffect(()=>{
  async function get(){
  if(user){
  const res = await axios.get(`/api/${user}` )
  console.log(res.data.stocks, 'res')
  const tickers = res.data.stocks
  getPrice(tickers)
  setInfo(res.data.username)
  setStocks(res.data.stocks)
  setLoading(false)
  }
  
}
get()
},[user])
 
  return (
    <>
    <div className="box-border h-64 w-128 p-2 border-2 flex justify-between">
    <h1>{info} Stock Portfolio:</h1>
    <ul>
      {stocks.map(stock => (
        <li key={stock.id}>{stock.ticker} Shares: {stock.shares}</li>
      ))}
    </ul>
    </div>
    </>
  )
}


export default Assets