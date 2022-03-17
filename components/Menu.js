import { useEffect, useState } from "react"
import Link from "next/link"
import Logout from '../components/Logout.js'

export default function Menu(){
  const [toggle, setToggle] = useState(false)
  const handleChange = (e)=>{
    setToggle(!toggle)
  }
  if(toggle == true){
    //open
    return(
      <>
      <div className="absolute  border-box border-4 h-64 w-64 top-0 right-0"> 
      <div className="border-content border-4 ">
          <nav className="absolute top-0 right-0 h-32 w-16 m-4">
          <div
          onClick={handleChange}
          className="box-content justify-center m-2 p-1 cursor-pointer">
          <div className="w-8 h-1 bg-emerald-400 m-1.5"></div>
          <div className="w-8 h-1 bg-emerald-400 m-1.5"></div>
          <div className="w-8 h-1 bg-emerald-400 m-1.5"></div>
          </div>
           </nav>
      </div>
      </div>
       <Logout></Logout>
      </>
    )
  }
  //close
  return(
   
        <nav className="absolute top-0 right-0 h-32 w-16 m-4">
          <div
          onClick={handleChange}
          className=" box-content justify-center m-2 p-1 cursor-pointer">
          <div className="w-8 h-1 bg-black m-1.5"></div>
          <div className="w-8 h-1 bg-black m-1.5"></div>
          <div className="w-8 h-1 bg-black m-1.5"></div>
          </div>
           </nav>
         
  )
}
