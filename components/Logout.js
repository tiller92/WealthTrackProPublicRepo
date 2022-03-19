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
  window.location.reload()
}

function handleSignIn(){
  console.log('sign in')
 router.push('/login')
}

if(user == ''){
  return (
    <button className="box-border p-1 m-2 border-1 shadow-lg rounded-lg bg-emerald-400" onClick={handleSignIn}>Sign In</button>
  )
}else{
  return (
    <>
  <div className="relative top-20 float justify-center flex flex-col">
  <button className="shadow-lg rounded-lg bg-emerald-400 m-1">Hello: {user}</button>
  <button className="shadow-lg rounded-lg bg-emerald-400 m-1" onClick={handleLogout}>Logout</button>
  <button className="shadow-lg rounded-lg bg-emerald-400 m-1" >Contact</button>
  <button className="shadow-lg rounded-lg bg-emerald-400 m-1" >About</button>
  </div>
  </>
  )
}

}