import { atom } from "recoil";
import { type currentuser } from "./currentUser";
import { Types } from "mongoose";
import { type selectedChat } from "./SelectedchatAtom";
export interface allmessages {
  _id: Types.ObjectId;
    content: string;
    sender:currentuser
    chatid: selectedChat;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
const allmessagesatom = atom<allmessages[]>({
    key:"allmessages",
    default:[]
})

export default allmessagesatom