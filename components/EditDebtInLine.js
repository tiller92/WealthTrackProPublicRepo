import { useState } from "react"
import axios from "axios"
import {MdOutlineModeEditOutline} from 'react-icons/md'
export default function EditInLine({id}){
  const initialState = {
    value:'',
    type:'',
    interest:'',
    id:id
  }

  const [toggle, setToggle] = useState(false)
  const [formData, setFormData] = useState(initialState)

  const handleToggle = (e)=>{
    //toggles form and also sends the update
    if(toggle == true){
      async function updateDB(){
        const res = await axios.post('/api/updateDebt', {
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
      id="name"
      name="type"
      value={formData.type} 
      onChange={handleChange}
      autoComplete="new-name"
      type="text" 
      placeholder="New Name" />

      <input 
      type="float" 
      name="value" 
      id="value"
      value={formData.value}
      onChange={handleChange}
      autoComplete="new-value"
      placeholder="New Value"
      />
      <input 
      type="float" 
      name="interest"
      id="interest" 
      value={formData.interest}
      onChange={handleChange}
      autoComplete={'new-interest'}
      placeholder='interest rate'
       />
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