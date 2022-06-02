import { useContext, useState } from "react"
import axios from "axios"
import { UsersContext } from "../../../components/UsersContext"
import { useRouter } from "next/router"
import Menu from "../../../components/Menu"
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
    name:'',
    value:'',
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
        const res = await axios.post('/api/addRealestate',{
         ...formData,
         username:username
        })
        if(res.status == 201){
          const realestateAddedNotify = ()=> toast.success(`${formData.name} was succesfully added!`)
          realestateAddedNotify
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

    <div className="border bg-emerald-400 shadow-slate-900 shadow-lg m-5 p-2 w-6/12 rounded-lg flex justify-center">

    <form className="" onSubmit={handleSubmit}>

    <div className="flex justify-center">
    <label htmlFor="name"
    className="p-1 pt-3"
    >Name</label>
    <input 
    id="name"
    type="text" 
    name='name' 
    value={formData.name}
    placeholder="Name of realestate"
    onChange={handleChange}
    autoComplete="new-name"
    className="p-1 m-2 border md:w-64 w-4/5"
    />
  </div>

    <div className="flex justify-center">
    <label htmlFor="value"
    className="p-1 pt-3"
    >
      Value</label>
    <input 
    id="value"
    type="integer" 
    name='value' 
    value={formData.value} 
    placeholder="estimated house value" 
    onChange={handleChange} 
    autoComplete="new-value"
    className="p-1 m-2 border md:w-64 w-4/5"
    />
    </div>
    <Toaster/>
    <div className="flex justify-center">
    <button className="box-border p-2 m-2 shadow-lg bg-yellow-200 rounded-md">Add Asset</button>
    </div>
    </form>
    </div>
    </div>
    </div>
    </>
    )
  }