import Chatscomp from "./Chatscomp";
import { userAuth } from "../../providers/Authprovider";
import SenReq from "./SenReq";
import RecievedReq from "./RecievedReq";
import { getAllchatsquery } from "../../services/queries";
import currentUser from "../../Atoms/currentUser";
import allChatsAtom from "../../Atoms/Allchatatom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { toast } from "react-toastify";
import selectedChatAtom from "../../Atoms/SelectedchatAtom";

const AllChats = () => {
  const selectedchat = useRecoilValue(selectedChatAtom)
  const { sentreq, recieved } = userAuth();
  const currentuser = useRecoilValue(currentUser);
  const setallchats = useSetRecoilState(allChatsAtom);
  if(currentuser){
    var current = currentuser._id?.toString();
  }
  var {data, error,isPending}= getAllchatsquery(current!);
  useEffect(()=>{
    if(error){
      toast.error(error.message)
    }
      setallchats(data!);
  },[data, error])
  
  return (
    <div className={`sm:block ${selectedchat.members ? " hidden": "block"}  h-full w-[100%] lg:w-[30%] overflow-y-scroll scrollbar-hide py-4   sm:w-[40%]  border-r-1 border-r-zinc-300  `}>
      {sentreq && <SenReq />}
      {recieved && <RecievedReq />}
      {!sentreq && !recieved && <Chatscomp pending={isPending} />}
    </div>
  );
};

export default AllChats;

// bg-yellow-500 sm:col-span-2 w-full  md:col-span-3
