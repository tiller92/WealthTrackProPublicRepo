import { useContext, useState } from "react"
import axios from "axios"
import { UsersContext } from "../../../components/UsersContext"
import { Router } from "react-router"
import { useRouter } from "next/router"
import Menu from '../../../components/Menu'
import toast, { Toaster } from 'react-hot-toast'

export async function getServerSideProps({query}){
  const {username} = query
  return {
    props: {username},
  }
} 


export default function AddStockForm({username}){
  const user = useContext(UsersContext)
 
 const initailState = {
    amount:'',
    username:username,
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
    async function findUserInfo(){
        console.log(formData)
        const res = await axios.post('/api/addCash',{
         ...formData,
         username:username
        })
        if(res.status == 201){
          const debtAddedNotify = ()=> toast.success(`$${formData.amount} was succesfully added!`)
          debtAddedNotify()
        console.log(res, 'res from addstock ')
        }else{
          const errorToast = ()=>toast.error('sorry something went wrong')
          errorToast()
        }
    setFormData(initailState)
    
  }
  findUserInfo()
} 
const router = useRouter()


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

    <form onSubmit={handleSubmit}>

    <div className="flex justify-center">
    <label htmlFor="amount"
    className="p-1 pt-3"
    >Amount</label>
    <input 
    id="amount"
    type="text" 
    name='amount' 
    value={formData.amount}
    placeholder="how much cash on hand"
    onChange={handleChange}
    autoComplete="new-amount"
    className="p-1 m-2 border md:w-64 w-4/5"
    />
    </div>
    
    <Toaster/>

    <div className="flex justify-center">
    <button className="box-border p-2 m-2 shadow-lg bg-yellow-200 rounded-md">Add Cash</button>
    </div>
    </form>
    </div>
    </div>
    </div>
    </>
    )
  }