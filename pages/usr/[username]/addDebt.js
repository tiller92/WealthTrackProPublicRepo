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
    type:'',
    interest:'',
    debt:'',
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
        const res = await axios.post('/api/addDebt',{
         ...formData,
         username:username
        })
        if(res.status == 201){
          const debtAddedNotify = ()=> toast.success(`${formData.type} was succesfully added!`)
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
    <div className="bg-gradient-to-r from-main-bg to-secondary h-screen">
    <nav className="flex justify-between">
      <Menu></Menu>
      <button onClick={()=>router.push(`/usr/${username}`)} className="box-border p-1 m-5 border-1 shadow-md rounded-lg w-32 h-16 bg-yellow-200 transition ease-in-out delay-150 hover:bg-emerald-400 duration-300 "
      >Home</button>
    </nav>

  <div className="flex justify-center"> 
    
  <div className="border bg-emerald-400 shadow-slate-900 shadow-lg m-5 p-2 w-6/12 rounded-lg flex justify-center ">

    <form onSubmit={handleSubmit}>

    <div className="flex justify-center">
    <label htmlFor="type"
    className="p-1 pt-3"
    >Name</label>
    <input 
    id="type"
    type="text" 
    name='type' 
    value={formData.type}
    placeholder="Type of Debt (i.e 'mortgage')"
    onChange={handleChange}
    autoComplete="new-type"
    className="p-1 m-2 border md:w-64 w-4/5"
    />
    </div>

    <div className="flex justify-center">
    <label htmlFor="debt"
    className="p-1 pt-3"
    >Value</label>
    <input 
    id="debt"
    type="float" 
    name='debt' 
    value={formData.debt} 
    placeholder="current debt total" 
    onChange={handleChange} 
    autoComplete="new-debt"
    className="p-1 m-2 border md:w-64 w-4/5"
    />
  </div>

  <div className="flex justify-center">
<label htmlFor="interest"
className=" pt-3"
>Inerest </label>
    <input 
    id="interest"
    type="float" 
    name='interest' 
    value={formData.interest} 
    placeholder="interest rate" 
    onChange={handleChange} 
    autoComplete="new-rate"
    className="p-1 m-2 border md:w-64 w-4/5"
    />
    </div>
    
    <Toaster/>

    <div className="flex justify-center">
    <button className="box-border p-2 m-2 shadow-lg bg-yellow-200 rounded-md">Add Debt</button>
    </div>
    </form>
    </div>
    </div>
    </div>
    </>
    )
  }