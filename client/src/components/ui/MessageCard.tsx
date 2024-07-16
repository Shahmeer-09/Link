import { type allmessages } from "../../Atoms/AllmessagesAtom";



import DelMsgprompts from "../Allchats/DelMsgprompt";

export interface MessageCardProps {
  msg: allmessages;
  socket: any;  
}


const MessageCard = ({ msg, socket }: MessageCardProps) => {
  const date = msg?.createdAt ? new Date(msg.createdAt) : null;
  const timeString = date
    ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  return (
    <div className=" flex mb-2 self-end flex-col w-[300px]  md:w-[360px]  ">
      {msg.image && (
        <div className=" p-2">
          <div className=" h-[180px]  border-2 border-cyan-400  rounded-t-lg ">
            <img
              className=" h-full  w-full object-cover rounded-t-lg "
              src={msg.image}
              alt=""
            />
          </div>
          <p className=" p-1 px-2 rounded-b-lg b text-xs  bg-cyan-400 ">
            {msg.content}
          </p>
        </div>
      )}
      {!msg.image && (
        <span
          className="rounded-2xl text-xs text-zinc-500 break-words bg-cyan-400 py-3
       px-4 "
        >
          {msg.content}
        </span>
      )}
      <div className="w-full   ">
        <span className=" sm:ml-[76%] ml-[70%] text-[10px] items-end  text-zinc-400">
          {timeString}
        </span>
        <DelMsgprompts socket={socket} msg={msg} />
      </div>
    </div>
  );
};

const RecieverCard = ({ msg }: MessageCardProps) => {
  const date = msg?.createdAt ? new Date(msg.createdAt) : null;
  const timeString = date
    ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  return (
    <div className=" flex mb-2  self-start flex-col md:w-[380px] w-[300px]   ">
      {msg.image && (
        <div className=" p-2">
          <div className=" h-[180px]  border-2 border-zinc-200  rounded-t-lg ">
            <img
              className=" h-full  w-full object-cover rounded-t-lg "
              src={msg.image}
              alt=""
            />
          </div>
          <p className=" p-1 px-2 rounded-b-lg b text-xs  bg-zinc-200 ">
            {msg.content}
          </p>
        </div>
      )}
      {msg.image == "" && (
        <span
          className="  rounded-2xl text-xs text-zinc-500 bg-zinc-200 py-3
       px-4 "
        >
          {msg.content}
        </span>
      )}
      <div className="">
        <span className="  text-[10px] ml-[16px] text-zinc-400">
          {timeString}
        </span>
      </div>
    </div>
  );
};
export { RecieverCard, MessageCard };
