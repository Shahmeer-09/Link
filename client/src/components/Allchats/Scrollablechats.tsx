import { RecieverCard, MessageCard } from "../ui/MessageCard";
import allmessagesatom from "../../Atoms/AllmessagesAtom";
import { useRecoilValue } from "recoil";
import currentUser from "../../Atoms/currentUser";
import { useEffect, useRef} from "react";


const Scrollablechats = ({socket}:{socket:any}) => {
  const allmessages = useRecoilValue(allmessagesatom);
  const currentuser = useRecoilValue(currentUser);
  const scrollRef = useRef<HTMLDivElement>(null);

 
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [allmessages.length]);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight - 50; // Adjust the offset as needed
    }
  }, [allmessages]);


  return (
    <>
      {allmessages.length == 0 && (
        <div className="h-[90%] flex  items-center justify-center ">
          <p className="text-cente text-yellow-400 font-semibold text-sm ">
            No messages yet, start a conversation now!
          </p>
        </div>
      )}

      {allmessages.length !== 0 && (
        <div
          ref={scrollRef}
          className="scrollable flex flex-col gap-3  px-6 h-[90%] pt-[40px] overflow-y-scroll   scrollbar-hide "
        >
          {allmessages.length !== 0 &&
            allmessages.map((msg) =>
              msg.sender._id.toString() === currentuser._id?.toString() ? (
                <MessageCard socket={socket}  key={msg?._id.toString()} msg={msg} />
              ) : (
                <RecieverCard  socket={socket} key={msg?._id.toString()} msg={msg} />
              )
            )}
        </div>
      )}
    </>
  );
};

export default Scrollablechats;
