import Menu from "../../../components/Menu"
import Logout from '../../../components/Logout'
import axios from "axios"
import { useRouter } from "next/router"


export default function SettingsPage(){
  const router = useRouter()
  function deleteUser(){
    if(localStorage.username != ''){
      axios.delete('/api/deleteUser',{
        data:{
        username:localStorage.username,
      },})
      localStorage.clear()
      return router.push('/')
    }else{
      return router.push('/')
    }
  }

  return (
    <>
    {/* <div className="absolute bg-gradient-to-r from-main-bg to-secondary w-screen  h-screen"> */}
    <div className='bg-slate-900  h-screen'>
    <div>
    <Menu></Menu>
    </div>
    <div className="m-5 p-5 border-box flex justify-center">
      <button onClick={deleteUser} className="bg-red-400 p-4 ">DELETE ACOUNT</button>
    </div>
    </div>
    </>
  )
}