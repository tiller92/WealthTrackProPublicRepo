
import { useContext,useEffect, useState,useLayoutEffect } from 'react'
import '../styles/globals.css'
import { UsersContext, checkUser } from '../components/UsersContext';
import Link from 'next/link';



function MyApp({ Component, pageProps }) {
 // Checks local storage for a logged in user. If the user has not been
	// authenticed it will bounce back to '/'
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

