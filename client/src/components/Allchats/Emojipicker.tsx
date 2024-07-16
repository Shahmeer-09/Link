import React from 'react'
import Picker  from "emoji-picker-react"
interface emojiprops {
    setmessage:React.Dispatch<React.SetStateAction<string>>
    message:string
}
const Emojipicker = ({ setmessage, message}:emojiprops) => {
  return (
    <div className=" absolute shadow-xl md:h-[300px]  rounded-lg   bg-zinc-800 text-white sm:w-[300px] md:bottom-16  md:left-[-40%] h-[280px] w-[280px]  left-[40px]  top-[-290px] ">
        <Picker previewConfig={{showPreview:false}} searchDisabled height={"100%"} width={"100%"} onEmojiClick={(emoji)=> setmessage( message + emoji.emoji )}  />
    </div>
  )
}

export default Emojipicker
