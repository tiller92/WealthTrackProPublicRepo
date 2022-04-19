import axios from "axios"
import { PrismaClient, prisma } from '@prisma/client'
import {useRouter}  from 'next/link'
import {AiOutlineDelete} from 'react-icons/ai';


export default function deleteReal({id,user}){
  
  const handleDelete = (e) => {
    async function send(){
      console.log(id)
      const res = await axios.delete('/api/deleteCash', {
        data:{
          id:id
        }
      })
      if(res.status === 204){
        console.log('DELETED')
        window.location.reload()
      }
      console.log(res)
    }
send()
}
    


  return (
    <>
    <button className="flex float-right mt-1" onClick={handleDelete}>
      <AiOutlineDelete/>
    </button>
    </>
  )
  }