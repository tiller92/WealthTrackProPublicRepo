import { useState, useEffect } from "react"
import {FiTrendingUp} from "react-icons/fi"
import { UsersContext } from '../components/UsersContext'
import { FaQuestion } from "react-icons/fa";
import HowToBox from "./HowToBox";
import handPic from '../public/handPhoto.jpeg'
import Image from "next/image";


export default function GetStarted({user}){
  const [toggle, setToggle] = useState(false)
  const {name} = UsersContext
  const handleToggle = ()=>{
    console.log(toggle)
    setToggle(!toggle)
  }

   return (
  <>

  <header className=" relative flex justify-center">
    <div className="flex flex-row m-5">
    <h1 className="text-7xl">Wealth Track Pro</h1>
    <FiTrendingUp size={80}/>
    </div>
  </header>
  <div className="relative flex justify-center h-auto w-auto h-auto " >
    <div className="border bg-emerald-400 shadow-slate-900 shadow-lg m-5 p-2 w-6/12 rounded-lg flex justify-around  ">
      <form action="/guest">
        <button
         className="box-border p-4 w-full m-2 border-4 rounded-lg transition ease-in-out delay-150 bg-yellow-200 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
         >Get Started!</button>
      </form>
      <form action="/login">
        <button  className="box-border w-full p-4 m-2 border-4 rounded-lg transition ease-in-out delay-150 bg-yellow-200 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
          Login
      </button>
      </form>
      <form action="/signup">
        <button className="box-border w-full p-4 m-2 border-4 rounded-lg transition ease-in-out delay-150 bg-yellow-200 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
        Sign Up
        </button></form>
        </div>
        </div>
        <div className="relative flex justify-center m-5 top-20">
            <button onClick={handleToggle} ><HowToBox toggle={toggle}></HowToBox></button>
          </div>

    </>
   )
 }
  
