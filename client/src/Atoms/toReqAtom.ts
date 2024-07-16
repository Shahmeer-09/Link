import { atom } from "recoil"
import { type currentuser } from "../Atoms/currentUser";

export interface toreq {
    status: string;
    user: currentuser;
    _id: string;
  }
const toreratom = atom<toreq[]>({
    key: "toreratom",
    default: []
})
export default toreratom;