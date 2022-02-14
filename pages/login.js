import SignUpForm from "../components/SignUpForm"
import Menu from '../components/Menu'
import Login from '../components/Login'
import {UsersContext} from '../components/UsersContext'

export default function Home() {
    return (
      <>
      <nav>
        <Menu></Menu>
      </nav>
      <Login></Login>
      </>
    )
}