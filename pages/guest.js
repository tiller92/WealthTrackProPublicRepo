import axios from "axios"
import { useRouter } from "next/router"
import { useContext, useEffect, useMemo, useState } from "react"
import { UsersContext } from "../components/UsersContext"
import getRandomInt from "../lib/randomNum"
import ClipLoader from "react-spinners/ClipLoader";

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
       try{
          const res = await axios.post('/api/adduser', {
          ...initailState   
        })
        console.log(res)
        if(res.status === 200){
              setUser(guest)
              localStorage.setItem('username',`${guest}`)
             return router.push(`/usr/${guest}`)
        }
      }catch(err){
        console.log(err)
      }
  }
      addUser()
     
    })

  return(
    <>
   
      <div className="flex justify-center sm:flex sm:justify-center">
        <p className="text-white text-2xl">
          Creating Guest Account
        </p>
      </div>
      <div className="flex justify-center sm:flex sm:justify-center">
    <ClipLoader loading={true} size={150} color={'white'}/>
    </div>
    </>
  )
}