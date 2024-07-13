import { Avatar, Button } from "@nextui-org/react";
import { FaTrashAlt } from "react-icons/fa";
import { type currentuser } from "../../Atoms/currentUser";

interface sentreq {
  user: currentuser;
  status: string;
  handleresend: (userid:string) => void;
  loading:boolean
}
const SentreqCard = ({ loading,user, status ,handleresend}: sentreq) => {
  return (
    <div className=" flex p-2 mb-2  border-b-1 border-b-zinc-300  ">
      <Avatar src={user?.Avatar} size={"sm"} />
      <div className="flex flex-col ml-2">
        <p className=" text-xs font-semibold ">Message request sent</p>
        <span className="text-xs text-zinc-400 "> to: {user?.name}</span>
      </div>
      <div className="flex  ml-auto">
        {status == "pending" ? (
          <p className=" mr-3 mt-2 font-semibold text-sm text-yellow-600 ">
            pending...
          </p>
        ) : (
          <Button size="sm"  className=" mx-3 " color="warning" disabled={loading} onClick={()=> handleresend(user?._id.toString())}  >
            Resend
          </Button>
        )}
        <button>
          <FaTrashAlt className="  text-red-700  " />
        </button>
      </div>
    </div>
  );
};

export default SentreqCard;
