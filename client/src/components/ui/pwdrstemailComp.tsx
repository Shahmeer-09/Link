import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";

//  interface types {
//     children: React.ReactNode;
//  }
import { IoSendOutline } from "react-icons/io5";
import { Input } from "../input";
import { Button } from "../button";
import { sendPasswordResetEmail, AuthError } from "firebase/auth";
import { auth } from "../../utils/firebase";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Pwdreset: React.FC = () => {
    const [email,setemail] = useState("")
    const [loading,setloading] = useState(false)
  const handleSendemail = async () => {
     setloading(true)
    try {
      await sendPasswordResetEmail(auth, email );
      toast.success("password reset email sent");
      setloading(false)
    } catch (error) {
    setloading(false)
      const err = error as AuthError;
      switch (err.code) {
        case  "auth/missing-email":
          toast.error("please provide a valid email");
          break;
        default:
            toast.error("an error occured");
          break;
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className=" text-xs mt-3  text-yellow-500 bg-transparent self-start cursor-pointer    ">
          Reset password?
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md w-[90%] bg-zinc-100 ">
        <DialogHeader className=" bg-zinc-100">
          <DialogTitle className=" bg-zinc-100">Reset Password</DialogTitle>
          <DialogDescription className=" bg-zinc-100">
            Enter your valid email address
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="  flex-1 gap-2">
            <Input
              className="  border border-4-black "
              type="email"
              placeholder="Enter your Email"
              required
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <span
            onClick={handleSendemail}
            className=" cursor-pointer grid place-content-center rounded-sm bg-zinc-400 h-full px-3 "
          >
            <IoSendOutline className="   size-4  text-white bg-zinc-400  " />
          </span>
        </div>
        <DialogFooter className=" bg-zinc-100  sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              className="  text-black text-xs px-5 hover:bg-yellow-400  bg-yellow-500 "
            >
              {
                loading? "loading..":"close"
              }
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Pwdreset;
