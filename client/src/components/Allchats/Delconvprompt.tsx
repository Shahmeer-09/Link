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
import { Input } from "../input";
import { Button } from "../button";
import { useState } from "react";
import Customfetch from "../../utils/Customfetch";
import allmessagesatom from "../../Atoms/AllmessagesAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "react-toastify";
import { userAuth } from "../../providers/Authprovider";
import { useQueryClient } from "@tanstack/react-query";
import selectedChatAtom from "../../Atoms/SelectedchatAtom";
const Delconvprompt = () => {
  const { token } = userAuth();
  const queryClient = useQueryClient();
  const setallmessage = useSetRecoilState(allmessagesatom);
  const selctedchat = useRecoilValue(selectedChatAtom);
  const [confirm, setconfirm] = useState("");
  const [loading, setloading] = useState(false);
  const hadledeleconv = async () => {
    if (confirm !== "Delete conv")
      return toast.error("Enter Delete Msg to delete message");
    try {
      setloading(true);
      await Customfetch.post(
        "/msg/delconv",
        {
          chatid: selctedchat._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setloading(false);
      toast.success("Conversation deleted");
      setallmessage([]);
      queryClient.invalidateQueries({
        queryKey: ["allchats", { chatid: selctedchat._id.toString() }],
      });
      queryClient.invalidateQueries({queryKey:["allchats"]});
    } catch (error) {
      toast.error("Error deleting message");
      setloading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={loading}
          className="lg:bg-yellow-500 bg-transparent text-red-600 ml-3 font-semibold hover:bg-transparent md:  lg:hover:bg-yellow-600 lg:text-zinc-100 lg:px-3"
        >
          {loading ? "Deleting..." : "Delete Chat."}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md w-[90%] bg-zinc-100 ">
        <DialogHeader className=" bg-zinc-100">
          <DialogTitle className=" bg-zinc-100 mb-2 ">
            Delter all chats
          </DialogTitle>
          <DialogDescription className=" bg-zinc-100">
            Enter{" "}
            <span className="  p-1 bg-yellow-400 text-zinc-100 ">
              Delete conv
            </span>{" "}
            if u want to delete all conv.
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
            <Button size={"sm"} color="danger" onClick={hadledeleconv}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Delconvprompt;
