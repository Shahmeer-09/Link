import { type currentuser } from "../Atoms/currentUser";

const getSender = (users:currentuser[], current:string)=>{
    const sender= users[0]._id.toString() == current ? users[1] : users[0]; 
    return sender
 }

 export default getSender