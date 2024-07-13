import React,{useRef} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import ImageReader from "../../Hooks/Imagereader";
import { GoPerson } from "react-icons/go"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";
import { Input } from "../input";
export type  imagetype  =string | ArrayBuffer | null;
interface regavatar {
  image: imagetype
  convertimage: (e: React.ChangeEvent<HTMLInputElement>) => void;

}
const RegAvatar = ({image, convertimage}:regavatar) => {
    const imagref = useRef<HTMLInputElement | null>(null)

  return (
    <div className=" flex bg-transparent items-center mb-4 justify-center">
      <TooltipProvider>
        <Tooltip  >
          <TooltipTrigger   >
            <Avatar onClick={()=> imagref.current?.click() }  className=" h-[80px] cursor-pointer  w-[80px] ">
              <AvatarImage
                src={image as string}
                className=" object-cover  object-center "
              />
              <AvatarFallback className="">
                <GoPerson className=" size-10 "  />
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <p >Select profile image</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Input
        onChange={convertimage}
        type="file"
        className=" hidden ml-4 cursor-pointer "
        ref={imagref}
      />
    </div>
  );
};

export default RegAvatar;
