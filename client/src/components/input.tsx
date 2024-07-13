import * as React from "react"
import { useState } from "react"
import { cn } from "../lib/utils"
import { VscEye, VscEyeClosed } from "react-icons/vsc";
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-8 w-full   text-zinc-800     bg-background px-3 py-2 border-zinc-500  file:bg-transparent file:text-xs text-xs  file:font-xs placeholder:text-muted-foreground placeholder:text-xm  outline-none  disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
        />
        
    )
  }
)
const InputPwd = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [visible, setvisible] = useState<boolean>(false)
    return (
      <div className="flex mt-3 w-full rounded-lg " >
      <input
        type={visible? "text":"password"}
        className={cn(
          "flex h-8 w-full text-zinc-800   rounded-s-lg   bg-background px-3 py-2 border-zinc-500  file:bg-transparent file:text-xs text-xs  file:font-xs placeholder:text-muted-foreground placeholder:text-xm  outline-none  disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
        />
        <button type="button"  className=" pr-4 cursor-pointer  "  onClick={()=> setvisible(!visible) } >{visible ? <VscEye/>: <VscEyeClosed/> }</button>
        </div>
    )
  }
)
Input.displayName = "Input"
InputPwd.displayName= "InputPwd"
export { Input,InputPwd }
