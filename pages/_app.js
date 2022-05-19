
import { useContext,useEffect, useState,useLayoutEffect } from 'react'
import '../styles/globals.css'
import axios from 'axios'
import { UsersContext, checkUser } from '../components/UsersContext';
import { createContex } from "react";
import Link from 'next/link';



function MyApp({ Component, pageProps }) {
  
  
  const [user, setUser] = useState(useContext(UsersContext))
  useEffect(()=>{
    localStorage.username ? setUser(localStorage.username) : <Link href={'/'}></Link>
  });



  return(
    <UsersContext.Provider value={user}>
     <Component {...pageProps} />
     </UsersContext.Provider>
  )}

export default MyApp

