import GetStarted from '../components/GetStarted'
import { UsersContext } from '../components/UsersContext'
import { useContext, useState,useEffect } from 'react'
import { useRouter } from 'next/router'





export default function Home({user}) {
  const router = useRouter()
  
  if(!user){
    return(
      <>  
    {/* <div className='bg-gradient-to-r from-main-bg to-secondary  h-screen'> */}
    <div className='bg-slate-900  h-screen'>
      <nav>
      </nav>
      <main>
      <GetStarted></GetStarted>
      </main>
      </div>
      </>
    )
  }else{
    return router.push(`/usr/${user}`)
  
  }

}
