import { atom } from "recoil";
import { type selectedChat } from "./SelectedchatAtom";
const allChatsAtom = atom<selectedChat[]>({
    key: "allchats",
    default:[]
})

export default allChatsAtom