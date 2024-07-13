import { SubmitHandler } from "react-hook-form";
import { confirmPasswordReset,AuthError } from "firebase/auth";
import { auth } from "../utils/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const schema = z.object({
    password: z.string().min(8),
    consfirPwd:z.string().min(8)
}).refine(data => data.password === data.consfirPwd, {
    message: "Passwords don't match",
    path: ["consfirPwd"]
  });;
export type FormFields = z.infer<typeof schema>;


const Pwdresethook = () => {
    const [loading, setloading] = useState(false)
    const [searchParams] = useSearchParams("");
    const navigate = useNavigate()

    const oobcode = searchParams.get("oobCode");
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormFields>({ resolver: zodResolver(schema) });
      const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
         if(!oobcode){
            toast.error("Invalid or expired password reset link.")
            return
         }
         setloading(true)
          try {
             await confirmPasswordReset(auth, oobcode, data.consfirPwd) 
             toast.success("password reset successfully")
             navigate('/auth')
          } catch (error) {
            setloading(false)
              const err=error as AuthError;
              switch (err.code) {
                case "auth/expired-action-code":
                    toast.error("Link is expired try to esend")
                    break;
              
                default:
                    toast.error("somthing went wrong")
                    break;
              }
              console.log(err)
              
          }
      };
  return {register, loading,handleSubmit,errors,onSubmit}
}

export default Pwdresethook