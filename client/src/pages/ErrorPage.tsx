import { useRouteError, ErrorResponse, useNavigate} from "react-router-dom"
import errorimage from "../assets/error.png" 

const ErrorPage = () => {
    const err = useRouteError() as ErrorResponse
    const navigate = useNavigate()

    if(err?.status ===404){
 
        return (
           <main className=" sm:h-full h-screen w-[100vw] flex items-center justify-center   " >
       
            <div className=" sm:h-[400px] h-[200px] w-[300px]  sm:w-[600px] " >
                <img src={errorimage} alt="" className=" h-full w-full " />
                <div className=" text-center  ">
                    <h4 className="mb-2 text-sm sm:text-2xl " >oops! page not found</h4>
                     <span onClick={()=>navigate(-1)} className="   text-yellow-600 cursor-pointer underline  " >Go back </span>
                </div>
            </div>
  
           </main>
        )
    }
}

export default ErrorPage