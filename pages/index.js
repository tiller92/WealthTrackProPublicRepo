import GetStarted from '../components/GetStarted'
import { useRouter } from 'next/router'

export default function Home({user}) {
  const router = useRouter()
  if(!user){
    return(
      <> 
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
