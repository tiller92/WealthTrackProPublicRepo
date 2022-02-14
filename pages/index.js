import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Login from '../components/Login'
import Menu from '../components/Menu'
import GetStarted from '../components/GetStarted'
import { UsersContext } from '../components/UsersContext'
import { useContext, useState } from 'react'


export default function Home() {
  const user = useContext(UsersContext) 
  if(user){
    // load logged in pages
  return (
    <>
    <nav>
      <Menu></Menu>
      </nav>
      <main>
   <h1>{user}</h1>
   </main>
   </>
    
  )
  //load the no user page
  }else{
    return(
      <>
      <nav>
      <Menu></Menu>
      </nav>
      <main>
      <GetStarted></GetStarted>
      </main>
      </>
    )
  }
}
