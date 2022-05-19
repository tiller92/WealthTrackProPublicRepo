import { useContext, useEffect, useState } from "react"
import { UsersContext } from "./UsersContext"
import { useRouter, router } from "next/router"
import { route } from "next/dist/server/router"


export default function LoginAndLogout(){
const [user,setUser] = useState(useContext(UsersContext))
const router = useRouter()
useEffect(()=>{
  localStorage.username ? setUser(localStorage.username) : setUser('')
})


function handleLogout(e){
  console.log('logout')
  localStorage.clear()
  return router.push('/')
  
}

function handleSignIn(){
  console.log('sign in')
 router.push('/signup')
}


function handleSettings(){
  router.push(`/usr/${user}/settings`)
}

if(user == ''){
  return (
    <>
     <div className="absolute flex flex-row">
    <button className="p-2 shadow-lg rounded-lg bg-emerald-400 m-1" onClick={handleSignIn}>Sign Up!</button>
    <button className="p-2 shadow-lg rounded-lg bg-emerald-400 m-1" >About</button>
    <button className="p-2 shadow-lg rounded-lg bg-emerald-400 m-1" >Contact</button>
    </div>
    </>
  )
}else{
  return (
    <>
  <div className="absolute flex flex-row">
  <button className="p-2 shadow-lg rounded-lg bg-emerald-400 m-1">Hello: {user}</button>
  <button className="p-2 shadow-lg rounded-lg bg-emerald-400 m-1" onClick={handleLogout}>Logout</button>
  <button className="p-2 shadow-lg rounded-lg bg-emerald-400 m-1" onClick={handleSettings} >Settings</button>
  <button className="p-2 shadow-lg rounded-lg bg-emerald-400 m-1" >About</button>
  </div>
  </>
  )
}

}