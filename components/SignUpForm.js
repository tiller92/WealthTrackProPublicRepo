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
    //TODO: add this tie lcoal storage and then push to the user home page
    if(res.status === 200){
    console.log(res)
      const userInfo = res.data.newUser 
      
      // localStorage.setItem('user',{...userInfo.user})
      router.push(`/login`)
    
      // set login state
      }else{
        //TODO: make and errorr component that takes an error and displays it
        console.log('error occurred')
        
      }

    }
    
    addUser()
    setFormData(initailState)
    
  }
  return(
    <>
        <nav className="flex justify-between">
      <Menu></Menu>
      <button onClick={()=>router.push(`/`)} className="box-border p-1 m-5 border-1 shadow-md rounded-lg w-32 h-16 bg-yellow-200 transition ease-in-out delay-150 hover:bg-emerald-400 duration-300 "
      >Home</button>
    </nav>

    <div className="flex justify-center">
    <div className="border bg-emerald-400 shadow-slate-900 shadow-lg m-5 p-2 w-6/12 rounded-lg flex justify-center ">

    <form className="" onSubmit={handleSubmit}>
    


    <div className="flex justify-center">

    <label htmlFor="username"
    className="pt-3"
    >Username</label>
    <input 
    id="username"
    type="text" 
    name='username' 
    value={formData.username}
    placeholder="username"
    onChange={handleChange}
    autoComplete="new-username"
    className="p-1 m-2 ml-4 border w-64"/>
    </div>

    <div className="flex justify-center">

    <label htmlFor="first_name"
    className="pt-3">Fisrt Name</label>
    <input 
    id="first_name"
    type="text" 
    name='first_name' 
    value={formData.first_name}
    placeholder=""
    onChange={handleChange}
    autoComplete="new_fistname"
    className="p-1 m-2 border w-64"/>
    </div>

    <div className="flex justify-center">

    <label htmlFor="last_name"
    className="pt-3">Last Name</label>
    <input 
    id="last_name"
    type="text" 
    name='last_name' 
    value={formData.last_name}
    placeholder=""
    onChange={handleChange}
    autoComplete="new_lastname"
    className="p-1 m-2 border w-64"/>
    </div>

    <div className="flex justify-center">

    <label htmlFor="email"
    className="p-1 pt-3 mr-2"
    >Email</label>
    <input type="email"
    id="email"
    name="email"
    value={formData.email}
    placeholder="email@email.com"
    onChange={handleChange} 
    autoComplete="new-email"
    className="p-1 m-2 ml-8 border w-64"/>
    </div>
  
    <div className="flex justify-center">

    <label htmlFor="password"
    className="p-1 pt-3"
    >Password</label>
    <input 
    id="password"
    type="password" 
    name='password' 
    value={formData.password} 
    placeholder="password" 
    onChange={handleChange} 
    autoComplete="new-password"
    className="p-1 m-1 border w-64"/>
    </div>

    <div className="flex justify-center">

    <button className="box-border p-2 m-2 shadow-lg bg-yellow-200 rounded-md">Sign Up</button>
    </div>
    </form>
    </div>
    </div>
    </>
    )
}