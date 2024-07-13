import {RecieverCard, MessageCard} from "./MessageCard"

const Scrollablechats = () => {
  return (
    <div className=" flex flex-col gap-3 overflow-y-scroll px-6 h-[90%]   scrollbar-hide " >
        <RecieverCard/>
        <MessageCard/>
        <MessageCard/>
        <RecieverCard/>
        <RecieverCard/>
        <MessageCard/>
        <MessageCard/>
        <RecieverCard/>
        <RecieverCard/>
    </div>
  )
}

export default Scrollablechats