import SentreqCard from "./SentreqCard";
import { FaArrowLeftLong } from "react-icons/fa6";
import { userAuth } from "../../providers/Authprovider";
import { type currentuser } from "../../Atoms/currentUser";
import { useRecoilValue } from "recoil";
import currentUser from "../../Atoms/currentUser";
import Customfetch from "../../utils/Customfetch";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
interface toreq {
  status: string;
  user: currentuser;
  _id: string;
}
const SenReq = () => {
  const currentuser = useRecoilValue(currentUser);
  const { setSentreq, token } = userAuth();
  const [toreq, settoreq] = useState<toreq[]>([]);

  const [loading, setloading] = useState(false);

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
    } catch (error) {
      setloading(false);
      const err = error as AxiosError;
      const newerror = err.response?.data as any;
      toast.error(newerror.message);
    }
  };

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
