import GetStarted from '../components/GetStarted'
import { UsersContext } from '../components/UsersContext'
import { useContext, useState,useEffect } from 'react'
import { useRouter } from 'next/router'





export default function Home() {
  const user = useContext(UsersContext) 
  const router = useRouter()
  
  if(user){
    // load logged in pages
  router.push(`/usr/${user}`)
  //load the no user page
  }else{
    return(
      <>  
    <div className='bg-gradient-to-r from-main-bg to-secondary  h-screen'>
      <nav>
      </nav>
      <main>
      <GetStarted></GetStarted>
      </main>
      </div>
      </>
    )
  }

}

