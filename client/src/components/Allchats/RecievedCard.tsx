import { Avatar } from "@nextui-org/react";
import { FaTrashAlt } from "react-icons/fa";

const RecievedCard = ({ handleacceReq,acceptload ,user,handlesubmit, loading }: any) => {

  return (
    <div className=" flex p-2 mb-2  border-b-1 border-b-zinc-300  ">
      <Avatar src={user?.Avatar} size={"sm"} />
      <div className="flex flex-col ml-2">
        <p className=" text-xs font-semibold ">New message Request</p>
        <span className="text-xs text-zinc-400 "> From {user?.name} </span>
      </div>
      <div className="flex  ml-auto">
        <button disabled={acceptload} onClick={()=>handleacceReq(user._id)}  className="text-xs rounded-lg  px-3  py-2 mx-2 cursor-pointer transition-all ease-in-out hover:bg-yellow-300 bg-yellow-400 text-zinc-100 ">
            Accept
        </button> 
        <button disabled={loading} onClick={()=>handlesubmit(user?._id)}>
          <FaTrashAlt  className="  text-red-700  " />
        </button>
      </div>
    </div>
  );
};

export default RecievedCard;
