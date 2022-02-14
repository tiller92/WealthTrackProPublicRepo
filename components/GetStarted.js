import { useState, useEffect } from "react"

import { UsersContext } from '../components/UsersContext'

export default function GetStarted({user}){
  const {name} = UsersContext
 if (name != null){
   return(
    <>
    <div className="relative top-64 grid grid-cols-4 " >

    <div className="" >
      
    </div>

      <div className="box-border col-span-2  border-4 ">
        <h2>Welcome! Create an account to get started</h2>
        <p>
          Hello, this project has been created to help you track and plan your wealth building strategy. The tools provided will help you plan your future and consolidate the planning process.
          Here you can add Stocks, Cryptocurrency's and even Realestate. We will do all the tracking and trending for you. 
        </p>
        <div className=" flex justify-center">
        <form action="#">
          <button className="box-border p-4 m-2 border-4 rounded-lg">Get Started!</button>
        </form>
        <form action="/login">
          <button  className="box-border p-4 m-2 border-4 rounded-lg">
            Login
        </button>
        </form>
        <form action="/signup">
          <button className="box-border p-4 m-2 border-4 rounded-lg">
          Sign Up
          </button></form>
          </div>
      </div>
      <div className="" >
    
    </div>
    </div>
      </>
  )
 }else{
   return (
  <>
  <div className="relative top-64 grid grid-cols-4 " >

  <div className="" >
    
  </div>

    <div className="box-border col-span-2  border-4 ">
      <h2>Welcome! {name}</h2>
      <p>
       
      </p>
      <div className=" flex justify-center">
      <form action="#">
        <button className="box-border p-4 m-2 border-4 rounded-lg">Get Started!</button>
      </form>
      <form action="/login">
        <button  className="box-border p-4 m-2 border-4 rounded-lg">
          Login
      </button>
      </form>
      <form action="/signup">
        <button className="box-border p-4 m-2 border-4 rounded-lg">
        Sign Up
        </button></form>
        </div>
    </div>
    <div className="" >
  
  </div>
  </div>
    </>
   )
 }
  }
