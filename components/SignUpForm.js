import axios from "axios"
import { useState, useEffect } from "react"



export default function SignUpForm(){

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
      if (res === true){
      // localStorage.setItem('user',{...userInfo.user})
      localStorage.setItem('first_name', userInfo.newUser.first_name)
      localStorage.setItem('last_name', userInfo.newUser.last_name)
      localStorage.setItem('username', userInfo.newUser.username)
      localStorage.setItem('id', userInfo.newUser.id)
      localStorage.setItem('token', userInfo.token)
      console.log(localStorage) 
      setUser(userInfo.user.username)
      Router.push(`/usr/${userInfo.user.username}`)
    }
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

    <label htmlFor="first_name">Fisrt Name</label>
    <input 
    id="first_name"
    type="text" 
    name='first_name' 
    value={formData.first_name}
    placeholder=""
    onChange={handleChange}
    autoComplete="new_fistname"/>

    <label htmlFor="last_name">Last Name</label>
    <input 
    id="last_name"
    type="text" 
    name='last_name' 
    value={formData.last_name}
    placeholder=""
    onChange={handleChange}
    autoComplete="new_lastname"/>

    <label htmlFor="email">email</label>
    <input type="email"
    id="email"
    name="email"
    value={formData.email}
    placeholder="email@email.com"
    onChange={handleChange} 
    autoComplete="new-email"/>

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
    <button className="box-border p-1 m-2 border-4 rounded-lg">Sign Up</button>
    
    </form>
  
    </div>
    </>
    )
}