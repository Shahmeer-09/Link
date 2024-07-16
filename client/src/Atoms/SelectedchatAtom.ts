import { atom } from "recoil";
import { type currentuser } from "./currentUser";
import { Types } from "mongoose";

export interface IMessage {
  content: string;
  sender: Types.ObjectId;
  chatid: Types.ObjectId;
  messageimage?: string;
  mimagepublic?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface selectedChat{
    _id:string
    members : currentuser[]
    latestMessage?:IMessage
    createdAt:Date
}
const selectedChatAtom = atom<selectedChat>({
    key:"selectedChatAtom",
    default: {} as selectedChat
})

export default selectedChatAtom;