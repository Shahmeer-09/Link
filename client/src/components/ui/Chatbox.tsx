import Scrollablechats from "../Allchats/Scrollablechats";
import { Input } from "../input";
import { FaRegImage } from "react-icons/fa";
import { IoIosSend, IoMdArrowBack } from "react-icons/io";
import selectedChatAtom from "../../Atoms/SelectedchatAtom";


import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,

} from "recoil";


import allmessagesatom, { allmessages } from "../../Atoms/AllmessagesAtom";
import { getAllMessagesquery } from "../../services/queries";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Customfetch from "../../utils/Customfetch";
import { userAuth } from "../../providers/Authprovider";
import currentUser from "../../Atoms/currentUser";
import { AxiosError } from "axios";
import Emojipicker from "../Allchats/Emojipicker";
import { CiFaceSmile } from "react-icons/ci";
import ImageReader from "../../Hooks/Imagereader";
import { RxCross1 } from "react-icons/rx";
import { useQueryClient } from "@tanstack/react-query";
import getSender from "../../utils/chatlogics";
import { User } from "@nextui-org/react";
import Delconvprompt from "../Allchats/Delconvprompt";
import io from "socket.io-client";
import TypingAnimation from "./TypingAnimation";

const ENDPOINT = "http://localhost:5000";
var socket: any;


const Chatbox = () => {
  const queryclient = useQueryClient();
  const { image, setImage, convertimage } = ImageReader();
  const currenuser = useRecoilValue(currentUser);
  const resetchat = useResetRecoilState(selectedChatAtom);
  const selctedchat = useRecoilValue(selectedChatAtom);
  const [messages, setmessages] = useRecoilState(allmessagesatom);
  const [typing, setistyping] = useState(false);
  const [emoji, setemoji] = useState(false);
  const { token } = userAuth();
  const [message, setmessage] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const imagref = useRef<HTMLInputElement>(null);
  const chatid = selctedchat._id;
  const { data, error, isPending } = getAllMessagesquery(chatid.toString());

  const sender = selctedchat?.members
    ? getSender(selctedchat?.members, currenuser._id?.toString()!)
    : null;



  useEffect(() => {
    if (!socket) {
      socket = io(ENDPOINT);
      socket.emit("setup", currenuser);
    }
    socket.on("typing",() => setistyping(true));
    socket.on("stop typing", () => setistyping(false));
    socket.on("deleted", ()=>queryclient.invalidateQueries({queryKey:["allchats", {"chatid":selctedchat._id.toString()}]}))
    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, [currenuser]);
  useEffect(() => {
    socket.emit("join chat", selctedchat._id);
  }, [selctedchat]);



  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved: allmessages) => {
      console.log(newMessageRecieved);
      if (
        !selctedchat.members ||
        selctedchat._id.toString() !== newMessageRecieved.chatid._id.toString()
      ) {
        toast.info(`${newMessageRecieved.sender.name} sent a new message`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        queryclient.invalidateQueries({ queryKey: ["allchats"] });
      } else {
        setmessages((prev) => [...prev, newMessageRecieved]);
      }
    });
    return () => {
      socket?.off("message received");
    };
  }, [setmessage, queryclient]);



  useEffect(() => {
    if (data) {
      setmessages(data);
    } else if (error) {
      toast.error(error.message);
      console.log(error);
    }
  }, [data, error]);


  const handlesendmessage = async () => {

    try {
      const res = await Customfetch.post(
        `/msg/sendmsg/?chatid=${selctedchat._id}`,
        {
          current: currenuser._id,
          message,
          image: image || "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newmsg = res.data.data[0];
      setmessages((prev) => [...prev, newmsg]);
      setmessage("");
      setImage("");
      socket?.emit("new message", newmsg);
      socket.emit("stop typing", selctedchat._id.toString());
      queryclient.invalidateQueries({ queryKey: ["allchats"] });
    } catch (error) {
      const err = error as AxiosError;
      const errmsg = err.response?.data as any;
      toast.error(errmsg.message);
    }
  };


  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setemoji(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    const handlekey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (message.trim() !== "") {
          handlesendmessage();
        }
      }
    };
    window.addEventListener("keypress", handlekey);
    return () => {
      window.removeEventListener("keypress", handlekey);
    };
  }, [message]);



  const handlechange = (e: { target: { value: SetStateAction<string> } }) => {
    setmessage(e.target.value);

    if (!socket) return;
   
    if (!typing) {
    
      socket.emit("typing",selctedchat._id.toString());
    }
     
  };
  return (
    <div
      className={` h-full  lg:w-[50%] md:w-[70%]  sm:w-[60%] sm:block w-full  ${
        selctedchat.members ? "block" : "hidden"
      }   `}
    >
      <div className=" h-[50px]   border-1 border-b-zinc-300 lg:h-[40px] lg:border-0  w-full flex     fixed ">
        <IoMdArrowBack
          onClick={() => resetchat()}
          className=" text-2xl mx-3 mt-2  cursor-pointer"
        />
        <div className="flex sm:justify-normal justify-between w-full lg:hidden ">
          <User
            name={sender?.name}
            description={sender?.email}
            avatarProps={{
              src: sender?.Avatar,
            }}
          />

          <Delconvprompt />
        </div>
      </div>
      {isPending && (
        <div className=" flex justify-center items-center text-cyan-400  h-[90%] ">
          Loading...
        </div>
      )}
      {error && !isPending && (
        <div className=" flex h-[90%] justify-center items-center text-red-600   ">
          something went wrong
        </div>
      )}
      {!error && !isPending && <Scrollablechats socket={socket} />}

      <div
        ref={containerRef}
        className="h-[50px] relative  border-1 border-t-zinc-300 py-3 px-6 flex items-center   "
      >
        {image && (
          <div className=" h-[40px] w-[60px] top-[-60px] absolute left-2  rounded-lg ">
            <RxCross1
              onClick={() => setImage("")}
              className=" bg-red-500  absolute top-[-8px] rounded-lg p-1  text-red-100  cursor-pointer font-semibold size-4  "
            />
            <img
              className=" bg-yellow-400  object-fill object-center  rounded-lg h-[100%] w-[100%]  "
              src={image.toString()}
              alt=""
            />
          </div>
        )}

        {typing ? (
          <div className=" h-[50px] absolute top-[-100px] inline-block ">
            <TypingAnimation />
          </div>
        ) : (
          <></>
        )}
        <div>
          <FaRegImage
            onClick={() => imagref.current?.click()}
            className="cursor-pointer text-zinc-500"
          />
          <input
            ref={imagref}
            onChange={(e) => convertimage(e)}
            type="file"
            className="hidden"
          />
        </div>

        <Input
          type="text"
          value={message}
          onChange={handlechange}
          placeholder="Enter your message.."
          className=" text-zinc-600 ml-2 flex-1"
        />
        {emoji && <Emojipicker message={message} setmessage={setmessage} />}
        <CiFaceSmile
          onClick={() => setemoji(!emoji)}
          className="mx-3 h-6 text-xl cursor-pointer "
        />
        <IoIosSend
          onClick={handlesendmessage}
          className=" text-yellow-500 cursor-pointer "
          size={22}
        />
      </div>
    </div>
  );
};

export default Chatbox;
