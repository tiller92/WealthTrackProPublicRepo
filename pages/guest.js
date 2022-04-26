import axios from "axios"
import { useRouter } from "next/router"
import { useContext, useEffect, useMemo, useState } from "react"
import { UsersContext } from "../components/UsersContext"
import getRandomInt from "../lib/randomNum"

export default function GuestLoader(){
  const router = useRouter()
  const [guest,setGuest] = useState(`guest${getRandomInt(10000)}`)
  const [user,setUser] = useState(null)
  //useContext(UsersContext)
  
  useEffect(()=>{
    user ? router.push(`/usr/${user}`): console.log('create guest')
  })
    // add a guest to the db and then redirect to home page
 useEffect(()=>{
      const initailState = {
        username:guest,
        first_name:'guest',
        last_name:'guest',
        email:'guest@gmail.com',
        password:'guest',
      } 
     async function addUser(){
          const res = await axios.post('/api/adduser', {
          ...initailState   
        })
        console.log(res)
        if(res.status === 200){
              setUser(guest)
            localStorage.setItem('username',`${guest}`)
             return router.push(`/usr/${guest}`)
        }
      }
      addUser()
    },[guest])

  return(
    <>
    <h1>loading</h1>
    </>
  )
}