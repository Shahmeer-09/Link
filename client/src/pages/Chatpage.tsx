import AllChats from "../components/Allchats/AllChats";
import Chatbox from "../components/ui/Chatbox";
import SenderProfile from "../components/ui/SenderProfile";
import Navbar from "../components/navbar/Navbar";
import { userAuth } from "../providers/Authprovider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getcurrentquery } from "../services/queries";
import currentUser from "../Atoms/currentUser";
import { useRecoilState } from "recoil";
const Chatpage = () => {
  const navigate = useNavigate();
  const { user } = userAuth();
  const [current, setCurrent] = useRecoilState(currentUser);
  var { data: loggeduser } = getcurrentquery();
 
  useEffect(() => {
    if (loggeduser) {
     localStorage.setItem("logged",JSON.stringify(loggeduser))
      setCurrent(loggeduser);
    }
  }, [loggeduser, setCurrent])
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return (
    <>
      {current.userid!==user?.uid ?  (
          <div className="h-screen grid place-content-center ">
             <div className="  animate-spinner-ease-spin rounded-full  border-2 border-b-yellow-400 h-[70px] w-[70px] "></div>
          </div>
      ) : ( 
        <div className="h-screen">
          <Navbar />
          <div className=" h-[91%] w-[100vw]  flex  ">
            <AllChats />
            <Chatbox />
            <SenderProfile />
          </div>
        </div>
      )}
    </>
  );
};

export default Chatpage;

//
