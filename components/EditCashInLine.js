import { useState } from "react"
import axios from "axios"
import {MdOutlineModeEditOutline} from 'react-icons/Md'
export default function EditInLine({id}){
  const initialState = {
    amount:'',
    id:id
  }

  const [toggle, setToggle] = useState(false)
  const [formData, setFormData] = useState(initialState)

  const handleToggle = (e)=>{
    //toggles form and also sends the update
    if(toggle == true){
      async function updateDB(){
        const res = await axios.post('/api/updateCash', {
          ...formData,
        })
        console.log(res, 'update')
      }
      updateDB()
      window.location.reload()
    }
    setToggle(!toggle)
  }

  const handleChange = (e)=> {
      setFormData(data =>({
        ...data,
        [e.target.name]:e.target.value,
      }))
  }
 
  if(toggle == true){
  return (
    <>
    <form action="">
      <input
      id="amount"
      name="amount"
      value={formData.type} 
      onChange={handleChange}
      autoComplete="new-amount"
      type="float" 
      placeholder="New Amount" />
    
      <button onClick={handleToggle}>Done</button>
    </form>
    </>
  )
  }else{
    return (
    <button onClick={handleToggle} className='flex float-right mt-1 mr-2'><MdOutlineModeEditOutline /></button>
    )
  }
}