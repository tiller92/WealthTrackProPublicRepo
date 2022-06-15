import { useState } from "react"
import axios from "axios"
import ClipLoader from "react-spinners/ClipLoader"
import { useRouter } from "next/router"

export default function({username}){
  const [loading ,setLoading] = useState(false)
  const router = useRouter()


  const initailState = {
    newUsername:`${username}`,
    newPassword:'',
    newPasswordConfirm:'',
    currentPassword:'',
  }

  const [formData, setFormData] = useState(initailState)

  const handleChange = (e) => {
    setFormData(data => ({
      ...data,
      [e.target.name]: e.target.value,
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    async function changeInfo(){
      const res = axios.patch('/api/updateUser', {
        ...formData,
        currentUserName:username
      })
      if(await res){
        setLoading(false)
        console.log(await res)
        if (formData.newUsername != username){
            localStorage.username = formData.newUsername
          return await router.push(`/usr/${formData.newUsername}`)
        }
      }
    }
    
    changeInfo()
  }

  return (
    <>
    <div className="flex justify-center bg-emerald-400 rounded-md p-5 w-1/2 sm:w-1/2 md:1/2 lg:w-1/3">

    <form action="" onSubmit={handleSubmit}>
      <div className="p-2 ">
      <label htmlFor="newUsername"
      className="text-slate-700
      pr-3
      "
      >New Username</label>
      <input 
      className=" sm:flex sm:float-right"
      type="text"
       name="newUsername"
       value={formData.newUsername}
       placeholder={username}
       onChange={handleChange}
       autoComplete="new-username"/>
      </div>

      <div className="p-2">
      <label htmlFor="username"
      className="text-slate-700
      pr-3"
      >New Password</label>
      <input 
      className=" sm:flex sm:float-right"
      type="password"
       name="newPassword"
       value={formData.newPassword}
       placeholder={'New Password'}
       onChange={handleChange}
       autoComplete="new-password"/>
      </div>


      <div className="p-2">
      <label htmlFor="confirm password"
      className="text-slate-700
      pr-3"
      >Confirm Password</label>
      <input 
      className=" sm:flex sm:float-right"
      type="password"
       name="newPasswordConfirm"
       value={formData.newPasswordConfirm}
       placeholder={'Confirm'}
       onChange={handleChange}
       autoComplete="new-password"/>
      </div>

      <div className="p-2">
      <label htmlFor="current password"
      className="text-slate-700
      pr-3"
      >Current Password</label>
      <input 
      className=" sm:flex sm:float-right"
      type="password"
       name="currentPassword"
       value={formData.currentPassword}
       placeholder={'Current Password'}
       onChange={handleChange}
       autoComplete="current-password"/>
      </div>

<div className="flex justify-center">
<button className="box-border  p-2 m-2 shadow-lg bg-yellow-200 rounded-md">Change Info</button>
</div>
    </form>

    <div className="flex justify-center sm:flex sm:justify-center">
    <ClipLoader loading={loading} size={150} color={'white'}/>
    </div>
    </div>
    </>
  )
  }