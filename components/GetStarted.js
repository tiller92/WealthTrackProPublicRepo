import { useState, useEffect } from "react"
import {FiTrendingUp} from "react-icons/fi"
import { UsersContext } from '../components/UsersContext'
import HowToBox from "./HowToBox";



export default function GetStarted({user}){
  const [toggle, setToggle] = useState(false)
  const {name} = UsersContext
  const handleToggle = ()=>{
    console.log(toggle)
    setToggle(!toggle)
  }

   return (
  <>
   
  <header className="relative flex justify-center">
    <div className="flex flex-row m-5">
    <h1 className="text-7xl text-fourth-green">Wealth Track Pro</h1>
    <FiTrendingUp color={'#21E6C1'} size={80}/>
    </div>
  </header>
  <div className="relative flex justify-center h-auto w-auto  " >
    <div className="box-border border bg-fourth-green shadow-slate-900 shadow-lg m-5 p-2 w-8/12 h-full rounded-lg ">
     
    <div className="flex flex-col justify-center m-auto">
      <form className="flex justify-center" action="/guest">
        <button
         className="box-border p-4 w-10/12 m-2 border-4 
         rounded-lg transition ease-in-out delay-50 bg-yellow-200 hover:bg-indigo-500"
         >Get Started!</button>
      </form>
      <form  className="flex justify-center" action="/login">
        <button  className="box-border w-10/12 p-4 m-2 border-4 rounded-lg transition ease-in-out delay-50 bg-yellow-200 hover:bg-indigo-500 ">
          Login
      </button>
      </form>
      <form className="flex justify-center"  action="/signup">
        <button className="box-border w-10/12 p-4 m-2 border-4 rounded-lg transition ease-in-out delay-50 bg-yellow-200 hover:bg-indigo-500 ">
        Sign Up
        </button>
        </form>
        </div>
        </div>
        </div>

        <div className="relative flex justify-center m-5 top-20 ">
            <button onClick={handleToggle} ><HowToBox
            
            toggle={toggle}></HowToBox></button>
          </div>
       
    </>
   )
 }
  
