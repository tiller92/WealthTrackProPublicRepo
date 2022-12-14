import axios from "axios"
import {AiOutlineDelete} from 'react-icons/ai';


export default function deleteStock({id,user}){
  const handleDelete = (e) => {
    async function send(){
      const res = await axios.delete('/api/deleteStock', {
        data:{
          id:id
        }
      })
      if(res.status === 204){
        window.location.reload()
      }
      
    }
send()
}
    
  return (
    <>
    <button className="flex float-right mt-1" onClick={handleDelete}>
      <AiOutlineDelete color="red"/>
    </button>
    </>
  )
  }