import { Avatar } from "@nextui-org/react";
interface colortype{
    color?: string | ""
}
const ChatCard = ({color}: colortype) => {
  return (
    <div className={`flex w-full bg-${color} gap-2 my-2 items-center p-2 rounded-lg `}>
      <Avatar
        src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
        isBordered
        color="warning"
        size="md"
        className="mx-2"
      />
      <div className={`flex-1 flex items-center bg-transparent justify-between`}>
        <div className="flex bg-transparent flex-col ">
          <p className={`text-sm font-semibold ${color?"text-zinc-100":"  text-zinc-700" } bg-transparent `}>yahyah</p>
          <span className={`text-xs bg-transparent  ${color?"text-zinc-100":"  text-zinc-500" }`}>Your message goes here ...</span>
        </div>
        <div className="flex bg-transparent px-2" >
          <span className={` ${color?"text-zinc-100":"  text-zinc-500" } text-tiny mx-2 bg-transparent `}>12:30</span>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
