import AllChats from "../components/Allchats/AllChats";
import Chatbox from "../components/ui/Chatbox";
import SenderProfile from "../components/ui/SenderProfile";
import Navbar from "../components/navbar/Navbar";
import { userAuth } from "../providers/Authprovider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getcurrentquery } from "../services/queries";
import currentUser from "../Atoms/currentUser";
import { useRecoilState, useRecoilValue } from "recoil";
import selectedChatAtom from "../Atoms/SelectedchatAtom";
import ChatboxAnimation from "../components/ui/ChatboxAnimation";
import io, { Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { allmessages } from "../Atoms/AllmessagesAtom";
import { toast } from "react-toastify";
const ENDPOINT = "http://localhost:5000";
var socket: Socket | null = null;
const Chatpage = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  const selectedchat = useRecoilValue(selectedChatAtom);
  const { user } = userAuth();

  const [current, setCurrent] = useRecoilState(currentUser);
  var { data: loggeduser } = getcurrentquery();

  useEffect(() => {
    if (loggeduser) {
      if (!socket) {
        localStorage.setItem("logged", JSON.stringify(loggeduser));
        setCurrent(loggeduser);
        socket = io(ENDPOINT);
        socket.emit("setup", loggeduser);
        socket.on("connected", () => {
          console.log("connected");
        });
        if(!selectedchat.members){

          socket.on("message recieved", (newMessage: allmessages) => {
            console.log(newMessage);
            console.log("helo")
            toast.info(`${newMessage.sender.name} sent a new message`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            
            query.invalidateQueries({ queryKey: ["allchats"] });
          });
        }
      
      } 
    }
    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;    
      }
    };
  }, [loggeduser, setCurrent]);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return (
    <>
      {current.userid !== user?.uid ? (
        <div className="h-screen grid place-content-center ">
          <div className="  animate-spinner-ease-spin rounded-full  border-2 border-b-yellow-400 h-[70px] w-[70px] "></div>
        </div>
      ) : (
        <div className="h-screen">
          <Navbar />
          <div className=" h-[91%] w-[100vw]  flex  ">
            <AllChats />
            {selectedchat.members ? (
              <>
                <Chatbox />
                <SenderProfile />
              </>
            ) : (
              <div className="sm:w-[70%] sm:block sm:h-[70%] py-10 hidden  ">
                <ChatboxAnimation />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Chatpage;

//
