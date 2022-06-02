import { useState } from "react"
import axios from "axios"
import {MdOutlineModeEditOutline} from 'react-icons/Md'
export default function EditCryptoInLine({id}){
  const initialState = {
    shares:'',
    id:id
  }

  const [toggleC, setToggleC] = useState(false)
  const [formData, setFormData] = useState(initialState)

  const handleCToggle = (e)=>{
    //toggles form and also sends the update
    if(toggleC == true){
      async function updateCDB(){
        const res = await axios.post('/api/updateCrypto', {
          ...formData,
        })
        console.log(res, 'update')
      }
      updateCDB()
      window.location.reload()
    }
    setToggleC(!toggleC)
  }

  const handleChange = (e)=> {
      setFormData(data =>({
        ...data,
        [e.target.name]:e.target.value,
      }))
  }
 
  if(toggleC == true){
  return (
    <>
    <form action="">
      <input
      id="shares"
      name="shares"
      value={formData.shares} 
      onChange={handleChange}
      autoComplete="new-shares"
      type="text" 
      placeholder="update shares" />
      <button onClick={handleCToggle}>Done</button>
    </form>
    </>
  )
  }else{
    return (
    <button onClick={handleCToggle} className='flex float-right mt-1 mr-2'><MdOutlineModeEditOutline /></button>
    )
  }
}