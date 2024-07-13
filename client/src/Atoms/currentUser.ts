import {atom} from "recoil"
import { Types } from "mongoose";
 export interface currentuser {
  _id:Types.ObjectId  
  name: string;
  email: string;
  Avatar: string; 
  userid: string;
  toReq: [];
  fromReq: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
const currentUser =atom <Partial<currentuser>>({
    key: "currentUser",
    default :JSON.parse(localStorage.getItem("logged") || "{}")

})
export default  currentUser