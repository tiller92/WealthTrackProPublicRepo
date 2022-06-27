import { FaQuestion } from "react-icons/fa"

export default function HowTooBoxIn({toggle}){ 

  if(toggle == true){
    return (
      <>
     <div className="m-5">
      <p className="text-white">
          Hit the plus sign under an asset or liability. Once added to your account your net worth will update. Stocks and Crypto information will be fetched using the Alphavantage API. 
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