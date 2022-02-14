import { useState } from "react"

export default function Menu(){
  const [toggle, setToggle] = useState(false)
  const handleChange = (e)=>{
    console.log(toggle)
    alert(`Toggled to: ${toggle} `)
    setToggle(!toggle)
   
  }
  return(
   
        <nav className="absolute box-border h-32 w-full p-4 border-4 flex justify-end">
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
