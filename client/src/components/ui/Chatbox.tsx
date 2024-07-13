import Scrollablechats from "./Scrollablechats";
import { Input } from "../input";
import { FaRegImage, FaRegSmile } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
const Chatbox = () => {
  return (
    <div className=" h-full lg:w-[50%] md:w-[70%]  sm:w-[60%] sm:block hidden   ">
       <Scrollablechats  />
       <div className="h-[50px] border-1 border-t-zinc-300 py-3 px-6 flex items-center   " >
        <FaRegImage className="cursor-pointer text-zinc-500"/>
          <Input type="text" placeholder="Enter your message.." className=" text-zinc-600 ml-2 flex-1"   />
          <FaRegSmile className="mx-3 cursor-pointer text-zinc-500 "/>
          <IoIosSend className=" text-yellow-500 cursor-pointer " size={22}/>
       </div>
    </div>
  );
};

export default Chatbox;
