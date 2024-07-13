import { SubmitHandler } from "react-hook-form";
import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageReader from "../Hooks/Imagereader";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Customfetch from "../utils/Customfetch";
import { toast } from "react-toastify";
import { type AxiosError } from "../utils/Customfetch";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
const schema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(8),
});
export type FormFields = z.infer<typeof schema>;
const RegHook = () => {

  const [loading, setloading] = useState(false);
  const { image, convertimage } = ImageReader();
  const naviagte = useNavigate();
  const queryclient = useQueryClient();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });
  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    try {
      if (!image) {
        setError("root", {
          message: "Please upload an image",
        });
        return;
      } else {
        setError("root", {});
      }
      setloading(true);
      const email = data.email;
      const password = data.password;
      let fireuser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(fireuser.user.uid);
      await Customfetch.post("/user/register", {
        name: data?.name,
        email: data?.email,
        image: image,
        userid: fireuser?.user.uid,
      });
      queryclient.invalidateQueries({ queryKey: ["current"] });
      naviagte("/chat");
      setloading(false);
    } catch (error) {
      setloading(false);
      const err = error as AuthError;
      if (err) {
        switch (err.code) {
          case "auth/email-already-in-use":
            toast.error("Email already in use");
            break;

          default:
            toast.error(err.message);
            break;
        }
      } else {
        const err = error as AxiosError;
        toast.error(err?.response?.data?.message);
      }
    }
  };
  return {
    onSubmit,
    loading,
    convertimage,
    image,
    errors,
    register,
    handleSubmit,
  };
};

export default RegHook;
