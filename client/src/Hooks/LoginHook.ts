import { SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword, AuthError } from "firebase/auth";
import { auth } from "../utils/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

enum AuthErrorCode {
  InvalidEmail = "auth/invalid-email",
  UserNotFound = "auth/user-not-found",
  WrongPassword = "auth/wrong-password",
  invalidCredentials = "auth/invalid-credential",
}
export type FormFields = z.infer<typeof schema>;
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});



const LoginHook = () => {
    const [loading, setloading] = useState(false);
    const naviagte = useNavigate();
    const queryclient = useQueryClient();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormFields>({ resolver: zodResolver(schema) });
    const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
      setloading(true);
      try {
        const email = data.email;
        const password = data.password;
         await signInWithEmailAndPassword(auth, email, password);
        
         naviagte("/chat");
         setloading(false);
         queryclient.invalidateQueries({ queryKey: ["current"] });
         queryclient.invalidateQueries({ queryKey: ["allchats"] });
      } catch (error) {
        const err = error as AuthError;
        switch (err?.code) {
          case AuthErrorCode.InvalidEmail:
            toast.error("Invalid email address.");
            break;
          case AuthErrorCode.UserNotFound:
            toast.error("User not found. Please register.");
            break;
          case AuthErrorCode.WrongPassword:
            toast.error("Incorrect password. Please try again.");
            break;
          case AuthErrorCode.invalidCredentials:
            toast.error("Invalid credentials. Please try again.",);
            break;
          default:
            toast.error(err.code);
        }
        setloading(false);
      }
      console.log(data);
    };
    return { onSubmit, errors, loading, register, handleSubmit };
}

export default LoginHook