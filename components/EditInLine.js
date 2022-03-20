import { useState } from "react"
import axios from "axios"

export default function EditInLine({id}){
  const initialState = {
    shares:'',
    id:id
  }

  const [toggle, setToggle] = useState(false)
  const [formData, setFormData] = useState(initialState)

  const handleToggle = (e)=>{
    //toggles form and also sends the update
    if(toggle == true){
      async function updateDB(){
        const res = await axios.post('/api/updateStock', {
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
      id="shares"
      name="shares"
      value={formData.shares} 
      onChange={handleChange}
      autoComplete="new-shares"
      type="text" 
      placeholder="update shares" />
      <button onClick={handleToggle}>Done</button>
    </form>
    </>
  )
  }else{
    return (
    <button onClick={handleToggle} className='flex float-right mr-2'>Edit</button>
    )
  }
}