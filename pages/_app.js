
import { useContext,useEffect, useState,useLayoutEffect } from 'react'
import '../styles/globals.css'
import axios from 'axios'
import { UsersContext, checkUser } from '../components/UsersContext';
import { createContex } from "react";
import Link from 'next/link';
import useLocalStorage from '../components/UsersContext';


//TODO: create a user object to pass to context:
// check local first then send to home page for log in



function MyApp({ Component, pageProps }) {
  
  const [user, setUser] = useState(useContext(UsersContext))
  useLayoutEffect(()=>{
    localStorage.username ? setUser(localStorage.username) : <Link href={'/'}></Link>
  },[user]);



  return(
    <UsersContext.Provider value={user}>
     <Component {...pageProps} />
     </UsersContext.Provider>
  )}

export default MyApp

