import SentreqCard from "./SentreqCard";
import { FaArrowLeftLong } from "react-icons/fa6";
import { userAuth } from "../../providers/Authprovider";
import { useRecoilState, useRecoilValue } from "recoil";
import currentUser from "../../Atoms/currentUser";
import Customfetch from "../../utils/Customfetch";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toreratom from "../../Atoms/toReqAtom";
import { type toreq } from "../../Atoms/toReqAtom";
const SenReq = () => {
  const currentuser = useRecoilValue(currentUser);
  const { setSentreq, token } = userAuth();
  const [toreq, settoreq] = useRecoilState(toreratom);
  const [removing, setremoving] = useState(false)
  const [loading, setloading] = useState(false);
   const queryclient = useQueryClient();    
  useEffect(() => {
    if (currentuser?.toReq) settoreq(currentuser?.toReq);
  }, [currentUser]);
  const handleResendReq = async (userid: string) => {
    try {
      setloading(true);
      const res = await Customfetch.post(
        "/user/resendreq",
        {
          current: currentuser?._id,
          userid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      settoreq(res?.data?.data)
      toast.success("request Resent successfully");
      setloading(false);
      queryclient.invalidateQueries({ queryKey: ["current"] });
    } catch (error) {
      setloading(false);
      const err = error as AxiosError;
      const newerror = err.response?.data as any;
      toast.error(newerror.message);
    }
  };

  const handleRemoveReq =async (userid:string)=>{
    try {
      setremoving(true)
        const res = await  Customfetch.post("/user/removereq",{
          current:currentuser._id, userid
        },
        {
          headers:{
            Authorization:`Bearer ${token}` 
          }
        }
      )
      setremoving(false)
      toast.success(res.data.message)
      settoreq(prev=> prev.filter((obj)=> obj.user?._id.toString()!=userid ))
      queryclient.invalidateQueries({queryKey:["current"]})
    } catch (error) {
      setloading(false)
      const err = error as AxiosError;
      const newerror = err.response?.data as any;
      toast.error(newerror.message);
    }
  }

  return (
    <div className="h-full w-full px-4 py-2">
      <div
        onClick={() => setSentreq(false)}
        className=" flex justify-start mb-2 hover:text-red-700 cursor-pointer  "
      >
        <FaArrowLeftLong />
      </div>

      {toreq.length != 0 ? (
        toreq.map((user: toreq) => (
          <SentreqCard
            key={user?._id}
            user={user?.user}
            status={user.status}
            handleresend={handleResendReq}
            loading={loading}
            handleRemoveReq={handleRemoveReq}
            removing={removing}
          />
        ))
      ) : (
        <div className=" h-[80%] flex items-center justify-center  ">
          <p className=" text-sm font-semibold text-yellow-400 ">
            Search the user and send req.
          </p>
        </div>
      )}
    </div>
  );
};

export default SenReq;
