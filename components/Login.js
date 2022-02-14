import axios from "axios"
import bcrypt from 'bcryptjs'
import { useState, useEffect,useLayoutEffect, createContext, useContext } from "react"
import Link from "next/link"
import { UsersContext } from "./UsersContext"
import Router, { useRouter } from "next/router"




export default function SignUpForm(){
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
  
  // check local storage for a logged in user

 
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
      Router.push('/')
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
    <div className="relative top-64 box-border b-4 h-64 flex justify-center">
    
    <form className="signUpForm" onSubmit={handleSubmit}>
    <div className="grid grid-cols-2">
    <label htmlFor="username">username</label>
    <input 
    id="username"
    type="text" 
    name='username' 
    value={formData.username}
    placeholder="username"
    onChange={handleChange}
    autoComplete="new-username"/>


    <label htmlFor="password">password</label>
    <input 
    id="password"
    type="password" 
    name='password' 
    value={formData.password} 
    placeholder="password" 
    onChange={handleChange} 
    autoComplete="new-password"/>
    </div>
    <button className="box-border p-1 m-2 border-4 rounded-lg">Login</button>
    
    </form>
    </div>
    </>
    )
  }