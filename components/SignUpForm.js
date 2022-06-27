import axios from "axios"
import { useRouter } from "next/router"
import { useState, useEffect, useContext } from "react"
import { UsersContext } from "./UsersContext"
import Menu from "./Menu"



export default function SignUpForm(){
  const router = useRouter()
  const user = useContext(UsersContext)
  useEffect(()=>{
  user ? router.push(`/usr/${user}`) : console.log('sign up!')
  console.log(user)
  },[user])
  const initailState = {
    username:'',
    first_name:'',
    last_name:'',
    email:'',
    password:'',
  }
  const [formData, setFormData] = useState(initailState)
  const handleChange = (e) => {
    setFormData(data => ({
      ...data,
      [e.target.name]: e.target.value,
    }))
  }
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    async function addUser(){
      const res = await axios.post('/api/adduser', {
      ...formData    
    })

    //push to user
    if(res.status === 200){
      const userInfo = res.data.newUser  
      return router.push(`/login`)
      }else{
        //display error in console
        console.log('error occurred') 
        return router.push('/signup')
      }
    }
    addUser()
    setFormData(initailState) 
  }
  return(
    <>
  
    <div className='bg-slate-900  h-screen'>
        <nav className="flex justify-between">
      <Menu></Menu>
      <button onClick={()=>router.push(`/`)} className="box-border p-1 m-5 border-1 shadow-md rounded-lg w-32 h-16 bg-yellow-200 transition ease-in-out delay-150 hover:bg-emerald-400 duration-300 "
      >Home</button>
    </nav>

    <div className="flex justify-center">
    <div className="border bg-emerald-400 shadow-slate-900 shadow-lg p-4 sm:m-5 sm:p-2 sm:w-6/12 rounded-lg flex justify-center ">

    <form className="" onSubmit={handleSubmit}>
    
    <div className="sm:flex sm:justify-center">
    <label htmlFor="username"
    className="sm:pt-3"
    >Username</label>
    <input 
    id="username"
    type="text" 
    name='username' 
    value={formData.username}
    placeholder="username"
    onChange={handleChange}
    autoComplete="new-username"
    className="sm:p-1 sm:m-2 sm:ml-4 border sm:w-64 md:w-64 w-4/5"/>
    </div>

    <div className="sm:flex  sm:justify-center">
    <label htmlFor="first_name"
    className="sm:pt-3">First Name</label>
    <input 
    id="first_name"
    type="text" 
    name='first_name' 
    value={formData.first_name}
    placeholder="Joe"
    onChange={handleChange}
    autoComplete="new_fistname"
    className="sm:p-1 sm:m-2 border md:w-64 w-4/5"/>
    </div>

    <div className="sm:flex sm:justify-center">
    <label htmlFor="last_name"
    className="sm:pt-3">Last Name</label>
    <input 
    id="last_name"
    type="text" 
    name='last_name' 
    value={formData.last_name}
    placeholder="Smoe"
    onChange={handleChange}
    autoComplete="new_lastname"
    className="sm:p-1 sm:m-2 border md:w-64 w-4/5"/>
    </div>

    <div className="sm:flex sm:justify-center">
    <label htmlFor="email"
    className="sm:pt-3 sm:px-5 pr-5">Email</label>
    <input type="email"
    id="email"
    name="email"
    value={formData.email}
    placeholder="email@email.com"
    onChange={handleChange} 
    autoComplete="new-email"
    className="sm:p-1 sm:m-2 border md:w-64 w-4/5"/>
    </div>
  
    <div className="sm:flex sm:justify-center">
    <label htmlFor="password"
    className="sm:p-1 sm:pt-3"
    >Password</label>
    <input 
    id="password"
    type="password" 
    name='password' 
    value={formData.password} 
    placeholder="password" 
    onChange={handleChange} 
    autoComplete="new-password"
    className="sm:p-1 sm:m-1 border md:w-64 w-4/5"/>
    </div>

    <div className="flex justify-center">
    <button className="box-border p-2 m-2 shadow-lg bg-yellow-200 rounded-md">Sign Up</button>
    </div>
    </form>
    </div>
    </div>
    </div>
    </>
    )
}