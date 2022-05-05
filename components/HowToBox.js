import { FaQuestion } from "react-icons/fa"

export default function HowToo({toggle}){ 

  if(toggle == true){
    return (
      <>
     <div>
       <p className="text-white">
         Welcome to Wealth Track Pro!

         Click get started to continue as a guest. To start tracking your net worth click the add button for the desired assest/liability. After you add one or two items hit the refresh button to see the calculated net worth. If you enjoy this service make an account to save all of your data. Once you logout of your guest account all of your data will be deleted. 
       </p>
     </div>
      </>
    )
  } else{
    return(
      <>
      <div className="animate-bounce">
      <FaQuestion color={'#21E6C1'}/>
      </div>
    </>
    )
  }
}