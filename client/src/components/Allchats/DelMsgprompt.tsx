import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { IoTrash } from "react-icons/io5";
import { Input } from "../input";
import { Button } from "../button";
import { useState } from "react";
import Customfetch from "../../utils/Customfetch";
import allmessagesatom, { allmessages } from "../../Atoms/AllmessagesAtom";
import { toast } from "react-toastify";
import { userAuth } from "../../providers/Authprovider";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import selectedChatAtom from "../../Atoms/SelectedchatAtom";

const DelMsgprompts = ({ msg, socket }: { msg: allmessages; socket: any }) => {
  const { token } = userAuth();

  const queryClient = useQueryClient();
  const setallmessage = useSetRecoilState(allmessagesatom);
  const selectedchat = useRecoilValue(selectedChatAtom);
  const [confirm, setconfirm] = useState("");
  const hadledelemessage = async (msgid: string) => {
    if (confirm !== "Delete Msg")
      return toast.error("Enter Delete Msg to delete message");
    try {
      await Customfetch.post(
        "/msg/delmsg",
        {
          msgid: msgid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setallmessage((prev) =>
        prev.filter((msg) => msg._id.toString() !== msgid)
      );
      socket.emit("delmsg", selectedchat._id.toString());
      queryClient.invalidateQueries({ queryKey: ["allchats"] });
    } catch (error) {
      toast.error("Error deleting message");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <IoTrash className=" mx-4 cursor-pointer self-end text-[12px]  inline-block " />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md w-[90%] bg-zinc-100 ">
        <DialogHeader className=" bg-zinc-100">
          <DialogTitle className=" bg-zinc-100">Reset Password</DialogTitle>
          <DialogDescription className=" bg-zinc-100">
            Enter{" "}
            <span className="  p-1 bg-yellow-400 text-zinc-100 ">
              Delete Msg
            </span>{" "}
            if u want to delete message
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="  flex-1 gap-2">
            <Input
              className="  border border-4-black "
              type="text"
              placeholder="Enter your text..."
              required
              value={confirm}
              onChange={(e) => setconfirm(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className=" bg-zinc-100  sm:justify-start">
          <DialogClose asChild>
            <Button
              size={"sm"}
              color="danger"
              onClick={() => hadledelemessage(msg._id.toString())}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DelMsgprompts;
