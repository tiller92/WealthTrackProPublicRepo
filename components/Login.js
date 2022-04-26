import axios from "axios"
import bcrypt from 'bcryptjs'
import { useState, useEffect,useLayoutEffect, createContext, useContext } from "react"
import { UsersContext } from "./UsersContext"
import { useRouter } from "next/router"
import Menu from "./Menu"




export default function LoginForm(){
  const initailStateLogged = {user:{
    id:0,
    username:'',
    first_name:'',
    last_name:'',
    email:'',
  }}
  const initailState = {
    username:'',
    password:'',
  }
  const [formData, setFormData] = useState(initailState)
  const [user,setUser] = useState(useContext(UsersContext))
  const router = useRouter()  

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
        const res = await axios.post('/api/hash',{
         ...formData
        })
      if(res.status === 200){
      const userInfo = JSON.parse(res.data.check)
      const compare = async()=> bcrypt.compare(formData.password, userInfo.user.password, function(err, res) {
        //returns true of false
     
      if (res === true){
      // localStorage.setItem('user',{...userInfo.user})
      localStorage.setItem('first_name', userInfo.user.first_name)
      localStorage.setItem('last_name', userInfo.user.last_name)
      localStorage.setItem('username', userInfo.user.username)
      localStorage.setItem('id', userInfo.user.id)
      localStorage.setItem('token', userInfo.token)
      console.log(localStorage) 
      setUser(userInfo.user.username)
      router.push(`/usr/${userInfo.user.username}`)
    }})
    compare()
      // set login state
      }else{
        //TODO: make and errorr component that takes an error and displays it
        console.log('error occurred')
        
      }
    }
    findUserInfo()
    setFormData(initailState)
    
  }


  return(
    <>
    <div className="bg-gradient-to-r from-main-bg to-secondary  h-screen">
    <div className="flex justify-between">
      <Menu></Menu>
      <button onClick={()=>router.push(`/`)} className="box-border p-1 m-5 border-1 shadow-md rounded-lg w-32 h-16 bg-yellow-200 transition ease-in-out delay-150 hover:bg-emerald-400 duration-300 "
      >Home</button>
    </div>

    <div className="flex justify-center">
    <div className="border bg-emerald-400 shadow-slate-900 shadow-lg m-5 p-2 w-6/12 rounded-lg flex justify-center">
    
    <form className="" onSubmit={handleSubmit}>

    <label htmlFor="username">
      username
      </label>
    <input 
    id="username"
    type="text" 
    name='username' 
    value={formData.username}
    placeholder="username"
    onChange={handleChange}
    autoComplete="new-username"
    className="p-1 m-2 border w-64"
    />

    <div>
    <label htmlFor="password">password</label>
    <input 
    id="password"
    type="password" 
    name='password' 
    value={formData.password} 
    placeholder="password" 
    onChange={handleChange} 
    autoComplete="new-password"
    className="p-1 m-2 border w-64"
    />
</div>

   
    <div className="flex justify-center">
      <button className="box-border p-2 m-2 shadow-lg bg-yellow-200 rounded-md">Login</button>
    </div>
    </form>
    </div>
    </div>
    </div>
    </>
    )
  }