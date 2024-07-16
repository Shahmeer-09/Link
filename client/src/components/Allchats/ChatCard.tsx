import { Avatar } from "@nextui-org/react";
import { type selectedChat } from "../../Atoms/SelectedchatAtom";
import getSender from "../../utils/chatlogics";
import currentUser from "../../Atoms/currentUser";
import { useRecoilState, useRecoilValue} from "recoil";
import selectedChatAtom from "../../Atoms/SelectedchatAtom";

interface chatcardprops {

  chat: selectedChat;
}
const ChatCard = ({chat }: chatcardprops) => {
  const currentuser = useRecoilValue(currentUser);
  const [selectedchat,setSelectChat ]= useRecoilState(selectedChatAtom);
  const date = chat.latestMessage?.createdAt ? new Date(chat.latestMessage.createdAt) : null;
  const timeString = date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  const sender = getSender(chat.members, currentuser._id?.toString()!);
   const color = selectedchat._id === chat._id ? "yellow-400" : "";
  return (
    <div
     onClick={()=>setSelectChat(chat)}
      className={`flex w-full bg-${color} cursor-pointer gap-2 my-2 items-center p-2 rounded-lg `}
    >
      <Avatar
        src={sender.Avatar}
        isBordered
        color="warning"
        size="md"
        className="mx-2"
      />
      <div
        className={`flex-1 flex items-center bg-transparent justify-between`}
      >
        <div className="flex bg-transparent flex-col ">
          <p
            className={`text-sm font-semibold ${
              color ? "text-zinc-100" : "  text-zinc-700"
            } bg-transparent `}
          >
            {sender.name}
          </p>
          <span
            className={`text-xs bg-transparent  ${
              color ? "text-zinc-100" : "  text-zinc-500"
            }`}
          >
            {chat.latestMessage ? chat.latestMessage.content.slice(0, 20) :" Start new conversation ... " }
          </span>
        </div>
        <div className="flex bg-transparent px-2">
          <span
            className={` ${
              color ? "text-zinc-100" : "  text-zinc-500"
            } text-tiny mx-2 bg-transparent `}
          >
            {timeString}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
