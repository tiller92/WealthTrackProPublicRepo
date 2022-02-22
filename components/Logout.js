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
console.log(user)
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
    <button onClick={handleSignIn}>Sign In</button>
  )
}else{
  return (
    <>
  <p>Hello: {user}</p>
  <button onClick={handleLogout}>Logout</button>
  </>
  )
}

}