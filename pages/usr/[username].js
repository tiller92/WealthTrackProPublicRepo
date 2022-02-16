import { useContext} from "react"
import Menu from "../../components/Menu"
import UserAsset from '../../components/UserAsset'
import { UsersContext } from "../../components/UsersContext"
import Router  from "next/router"



export default function UserHome(){
const user = useContext(UsersContext)
const handleSubmit = (e) =>{
  // sends login data to api update user state
  e.preventDefault()
  Router.push(`/usr/${user}/addstock`)
}
// inside of main will be all of the assets. Each asses will return a block in div form
  return (
    <>
    <nav>
    <Menu></Menu>
    </nav>
    <main>
    <div className="grid grid-cols-3 ">

    <div className="border-box h-64 border-2 p-2 col-span-3 flex justify-center"><h1>NET WORTH COMPONENT WILL GO HERE</h1></div>

    <UserAsset value={user}></UserAsset>

    <div className="flex justify-center" ><h1>Crypto Assest component here</h1></div>

    <div className="flex justify-center" ><h1>Realestate Assest component here</h1></div>

    
    <div className="flex justify-center" ><button className="box-border p-1 m-2 border-4 rounded-lg" onClick={handleSubmit}>add assest</button></div>
    <div className="flex justify-center" ><button className="box-border p-1 m-2 border-4 rounded-lg">add assest</button></div>
    <div className="flex justify-center" ><button className="box-border p-1 m-2 border-4 rounded-lg">add assest</button></div>

    </div>
    </main>
    </>
  )
}