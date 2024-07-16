import { Avatar } from "@nextui-org/react";
import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import currentUser from "../../Atoms/currentUser";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import authSwitch from "../../Atoms/Authswitch";
import { useRecoilValue,useSetRecoilState } from "recoil";
import { Navigate } from "react-router-dom";
import { userAuth } from "../../providers/Authprovider";
import { useQueryClient } from "@tanstack/react-query";
const Profilemodal = () => {
  const queryclient = useQueryClient()
  const {setSentreq,setRecieved}  = userAuth()
  const current = useRecoilValue(currentUser);
  const setSwitch = useSetRecoilState(authSwitch);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      <Navigate to={"/auth"} />;
      setSwitch(true);
      setRecieved(false);
      setSentreq(false);
       queryclient.invalidateQueries({
        queryKey: ["current"],
        
      });
      queryclient.invalidateQueries({
        queryKey: ["allchats"],
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Avatar
            src={current?.Avatar}
            radius="sm"
            isBordered
            size="sm"
            className="cursor-pointer"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className=" my-auto flex flex-col items-center   ">
            <img
              src={current?.Avatar}
              className=" rounded-full object-cover h-[170px] w-[170px] "
            />
            <div className=" flex flex-col gap-3 text-center mt-6">
              <h5 className=" font-semibold ">{current?.name}</h5>
              <p>{current?.email}</p>
              <Button
                onClick={handleLogout}
                className=" bg-red-700 hover:bg-red-600 "
              >
                Logout
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Profilemodal;
