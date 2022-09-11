
import { useContext,useEffect, useState,useLayoutEffect } from 'react'
import '../styles/globals.css'
import { UsersContext, checkUser } from '../components/UsersContext';
import Link from 'next/link';



function MyApp({ Component, pageProps }) {
  // user logic then user context added. Any time home page is loaded
  
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

