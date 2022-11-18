import { useContext, useLayoutEffect, useState } from "react"
import axios from "axios"
import { UsersContext } from "../../../components/UsersContext"
import { useRouter } from "next/router"
import Menu from '../../../components/Menu'
import toast, { Toaster } from 'react-hot-toast'
import { BsCheckSquareFill } from "react-icons/bs";
import {ALPHA_API_KEY} from '../../../secret'

export async function getServerSideProps({query}){
  const {username} = query
  return {
    props: {username},
  }
} 



export default function AddStockForm({username}){
const user = useContext(UsersContext)
const router = useRouter()
 
 const initailState = {
    ticker:'',
    shares:'',
    username:user,
  }
  const [formData, setFormData] = useState(initailState)
   
  const handleChange = (e) => {
    setFormData(data => ({
      ...data,
      [e.target.name]: e.target.value,
    }))
  }

 
  const handleSubmit = (e) =>{
    // sends login data to api update user state
    e.preventDefault()
    async function checkForStock(){
      const res1 = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${formData.ticker}&apikey=${ALPHA_API_KEY}`)
      if(res1['data']['Meta Data']){
        findUserInfo()
      }else{
        const errorToastNoTic = ()=>toast.error('Not a Valid Ticker')
        errorToastNoTic()
      }
    }
    checkForStock()
    async function findUserInfo(){
        const res = await axios.post('/api/addstock',{
         ...formData,
         username:username
        })
    if(res.status == 201){
      const stockAddedNotify = ()=> toast.success(`${formData.ticker} was succesfully added!`)
      stockAddedNotify()
    }else{
      const errorToast = ()=>toast.error('sorry something went wrong')
      errorToast()
     
    }
    setFormData(initailState)
    
  }
  // findUserInfo()
} 



  return(
    <>
    {/* <div className="bg-gradient-to-r from-main-bg to-secondary h-screen"> */}
    <div className='bg-slate-900  h-screen'>
    <nav className="flex justify-between">
      <Menu></Menu>
      <button onClick={()=>router.push(`/usr/${username}`)} className="box-border p-1 m-5 border-1 shadow-md rounded-lg w-32 h-16 bg-yellow-200 transition ease-in-out delay-150 hover:bg-emerald-400 duration-300 "
      >Home</button>
    </nav>

    <div className="flex justify-center">

    <div className="border bg-emerald-400 shadow-slate-900 shadow-lg m-5 p-2 w-6/12 rounded-lg flex justify-center ">

    <form  onSubmit={handleSubmit}>

   <div className="flex justify-center">
    <label 
    className="p-1 pt-3"
    htmlFor="ticker">Ticker
    </label>
    <input 
    id="ticker"
    type="text" 
    name='ticker' 
    value={formData.ticker}
    placeholder="ticker symbol (example VOO)"
    onChange={handleChange}
    autoComplete="new-ticker"
    className="p-1 m-2 border md:w-64 w-4/5"
    />
  </div>

  <div className="flex justify-center">
    <label htmlFor="shares"
    className="pt-3"
    >Shares</label>
    <input 
    id="shares"
    type="integer" 
    name='shares' 
    value={formData.shares} 
    placeholder="how many shares?" 
    onChange={handleChange} 
    autoComplete="new-shares"
    className="p-1 m-2 border md:w-64 w-4/5"/>
    </div>

    <Toaster/>
    
    <div className="flex justify-center">
    <button className="box-border p-2 m-2 shadow-lg bg-yellow-200 rounded-md">Submit Asset</button>
    </div>
    </form>
    </div>
    </div>
    </div>
    </>
    )
  }
