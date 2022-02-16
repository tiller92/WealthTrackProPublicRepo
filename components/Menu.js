import { useState } from "react"

export default function Menu(){
  const [toggle, setToggle] = useState(false)
  const handleChange = (e)=>{
    console.log(toggle)
    alert(`Toggled to: ${toggle} `)
    setToggle(!toggle)
   
  }
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
