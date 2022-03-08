import { useContext, useState } from "react"
import axios from "axios"
import { UsersContext } from "../../../components/UsersContext"
import { Router } from "react-router"
import { useRouter } from "next/router"


export default function AddStockForm(){
  const user = useContext(UsersContext)
 
 const initailState = {
    type:'',
    interest:0,
    debt:0,
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
        console.log(formData)
        const res = await axios.post('/api/addDebt',{
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
    <label htmlFor="type">type</label>
    <input 
    id="type"
    type="text" 
    name='type' 
    value={formData.type}
    placeholder="Type of Debt (i.e 'mortgage')"
    onChange={handleChange}
    autoComplete="new-type"/>


    <label htmlFor="debt">debt value</label>
    <input 
    id="debt"
    type="float" 
    name='debt' 
    value={formData.debt} 
    placeholder="current debt total" 
    onChange={handleChange} 
    autoComplete="new-debt"/>


<label htmlFor="interest">interest percent </label>
    <input 
    id="interest"
    type="float" 
    name='interest' 
    value={formData.interest} 
    placeholder="interest rate" 
    onChange={handleChange} 
    autoComplete="new-rate"/>
    </div>

    <button className="box-border p-1 m-2 border-4 rounded-lg">add debt</button>
    </form>
    <button onClick={()=>router.push(`/usr/${user}`)} className="box-border p-1 m-2 border-4 rounded-lg">Home</button>
    </div>
    </>
    )
  }