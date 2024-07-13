import Chatscomp from "./Chatscomp";
import { userAuth } from "../../providers/Authprovider";
import SenReq from "./SenReq";
import RecievedReq from "./RecievedReq";
const AllChats = () => {
  const { sentreq, recieved } = userAuth();
  return (
    <div className=" h-full w-[100%] lg:w-[30%] overflow-y-scroll scrollbar-hide py-4   sm:w-[40%]  border-r-1 border-r-zinc-300  ">
      {sentreq && <SenReq />}
      {recieved &&<RecievedReq />}
      {!sentreq && !recieved && <Chatscomp />}
    </div>
  );
};

export default AllChats;

// bg-yellow-500 sm:col-span-2 w-full  md:col-span-3
