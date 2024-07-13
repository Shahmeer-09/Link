import RecievedCard from "./RecievedCard";
import { FaArrowLeftLong } from "react-icons/fa6";
import { userAuth } from "../../providers/Authprovider";
import { useRecoilValue } from "recoil";
import currentUser from "../../Atoms/currentUser";
import Customfetch from "../../utils/Customfetch";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

const RecievedReq = () => {
  const { setRecieved, token } = userAuth();
  const currentuser = useRecoilValue(currentUser);
  const [from, setfrom] = useState<any>([]);
  const [declineload, setdeclineload] = useState(false)
  useEffect(() => {
    if (currentuser?.fromReq) setfrom(currentuser?.fromReq);
  }, [currentuser]);

  const queryClient = useQueryClient();
  const handledeclinereq = async (userid: string) => {
    try {
      setdeclineload(true)
      await Customfetch.post(
        "/user/declinereq",
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
      setfrom((prev: any) => prev.filter((obj: any) => obj._id != userid));
      queryClient.invalidateQueries({ queryKey: ["current"] });
      setdeclineload(false)
    } catch (error) {
      console.log(error);
      const err = error as AxiosError;
      const newerror = err.response?.data as any;
      toast.error(newerror.message);
      setdeclineload(false)
    }
  };
  console.log(from);
  return (
    <div className="h-full w-full px-4 py-2">
      <div
        onClick={() => setRecieved(false)}
        className=" flex justify-start mb-2 hover:text-red-700 cursor-pointer  "
      >
        <FaArrowLeftLong />
      </div>
      {from.length != 0 ? (
        from.map((obj:any) => (
          <RecievedCard key={obj?.userid} user={obj}  handlesubmit={handledeclinereq} loading={declineload} />
        ))
      ) : (
        <div className=" h-[80%] flex items-center justify-center  ">
          <p className=" text-sm font-semibold text-yellow-400 ">
            you dont have any request
          </p>
        </div>
      )}
    </div>
  );
};

export default RecievedReq;
