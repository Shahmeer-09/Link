import Search from "../navbar/Drawer";
import ChatCard from "./ChatCard";
import allChatsAtom from "../../Atoms/Allchatatom";
import { useRecoilValue} from "recoil";
const Chatscomp = ({pending}:any) => {
  const allchats = useRecoilValue(allChatsAtom);

  return (
    <div className="h-full w-full px-4 py-2 ">
      <Search />
      {!pending && allchats&& allchats.length !== 0 ? (
        <div className=" w-full   p-2 ">
          {allchats.map(chat => (
             
            <ChatCard key={chat._id}   chat={chat}/>
          ))}
        </div>
      ) : (
        <div className=" w-full text-center    px-4 ">
          <p className="text-sm text-yellow-400 mt-10  font-semibold ">
          {pending && "Please wait while chats are being fetched "}
             { !pending && allchats&& allchats.length === 0 && "No chats found , please search and Send messgae requests then start chatting "}
          </p>
        </div>
      )}
    </div>
  );
};

export default Chatscomp;
