import selectedChatAtom from "../../Atoms/SelectedchatAtom";
import { useRecoilValue } from "recoil";
import currentUser from "../../Atoms/currentUser";
import getSender from "../../utils/chatlogics";
import Delconvprompt from "../Allchats/Delconvprompt";
const SenderProfile = () => {
  const selctedchat = useRecoilValue(selectedChatAtom);
  const currentuser = useRecoilValue(currentUser);
  const sender = getSender(selctedchat.members, currentuser._id?.toString()!);
  
  return (
    <div className=" h-full lg:w-[20%] lg:block hidden   border-l-zinc-300 border-l-1 p-3  ">
      <div className=" my-auto flex flex-col items-center mt-[60px]  ">
        <img
          src={sender.Avatar}
          className=" rounded-full object-cover h-[170px] w-[170px] "
        />
        <div className=" flex flex-col gap-3 text-center mt-6">
          <h5 className=" font-semibold ">{sender.name}</h5>
          <p>{sender.email}</p>
          <Delconvprompt />
        </div>
      </div>
    </div>
  );
};

export default SenderProfile;

// bg-yellow-500  hidden sm:hidden md:block  md:col-span-2
