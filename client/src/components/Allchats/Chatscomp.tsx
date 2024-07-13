import Search from "../navbar/Drawer"
import ChatCard from "./ChatCard"
const Chatscomp = () => {
  return (
    <div className="h-full w-full px-4 py-2 " >
        <Search/>
        <div  className= " w-full   p-2 ">
            <ChatCard color="yellow-400" />
            <ChatCard/>
            <ChatCard/>
        </div>
    </div>
  )
}

export default Chatscomp