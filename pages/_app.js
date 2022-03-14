
import { useContext,useEffect, useState,useLayoutEffect } from 'react'
import '../styles/globals.css'
import axios from 'axios'
import { UsersContext, checkUser } from '../components/UsersContext';
import { createContex } from "react";
import Link from 'next/link';
import Head from 'next/head';
import useLocalStorage from '../components/UsersContext';


function MyApp({ Component, pageProps }) {
  
  //TODO: layout effect works better but errors
  const [user, setUser] = useState(useContext(UsersContext))
  useEffect(()=>{
    localStorage.username ? setUser(localStorage.username) : <Link href={'/'}></Link>
  },[]);



  return(
    <UsersContext.Provider value={user}>
     <Component {...pageProps} />
     </UsersContext.Provider>
  )}

export default MyApp

