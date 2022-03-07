import { useContext, useState } from "react"
import axios from "axios"
import { UsersContext } from "../../../components/UsersContext"
import { Router } from "react-router"
import { useRouter } from "next/router"


export default function AddStockForm(){
  const user = useContext(UsersContext)
 
 const initailState = {
    name:'',
    value:'',
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
    async function findUserInfo(){
        const res = await axios.post('/api/addRealestate',{
         ...formData,
         username:user
        })
    setFormData(initailState)
    
  }
  findUserInfo()
} 
const router = useRouter()


  return(
    <>
    <div className="relative top-64 box-border b-4 h-64 flex justify-center">
    
    <form className="signUpForm" onSubmit={handleSubmit}>
    <div className="grid grid-cols-2">
    <label htmlFor="name">Name</label>
    <input 
    id="name"
    type="text" 
    name='name' 
    value={formData.name}
    placeholder="Name of realestate"
    onChange={handleChange}
    autoComplete="new-name"/>


    <label htmlFor="value">value</label>
    <input 
    id="value"
    type="integer" 
    name='value' 
    value={formData.value} 
    placeholder="estimated house value" 
    onChange={handleChange} 
    autoComplete="new-value"/>
    </div>

    <button className="box-border p-1 m-2 border-4 rounded-lg">add asset</button>
    </form>
    <button onClick={()=>router.push(`/usr/${user}`)} className="box-border p-1 m-2 border-4 rounded-lg">Home</button>
    </div>
    </>
    )
  }