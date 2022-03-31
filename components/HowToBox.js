import { FaQuestion } from "react-icons/fa"

export default function({toggle}){ 

  if(toggle == true){
    return (
      <>
     <div>
       <p className="text-fourth-green">
         Welcome to Wealth Track Pro!

         Click get started to cont as a guest. Anything you enter in as guest will not be saved if you close your browser. Make an account to save all your info.
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