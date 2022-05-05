import GetStarted from '../components/GetStarted'
import { UsersContext } from '../components/UsersContext'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { getTimeAndDate } from '../lib/timeAndDate'
import {testAPI} from '../lib/notes'



export default function Home() {
  const user = useContext(UsersContext) 
  const router = useRouter()
  

  if(user){
    // load logged in pages
  
  return router.push(`/usr/${user}`)
 
  //load the no user page
  }else{
    return(
      <>  
    <div className='bg-gradient-to-r from-main-bg to-secondary  h-screen'>
      <nav>
      </nav>
      <main className='h-2/6'>
      <GetStarted></GetStarted>
      </main>
      </div>
      </>
    )
  }

}

