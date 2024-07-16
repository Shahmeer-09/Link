import {useQuery} from "@tanstack/react-query"

import { getcurrentuser,getAllchats, getAllmessges } from "./api"
import { userAuth } from "../providers/Authprovider"

 export const getcurrentquery  = ()=>{
  const {token} = userAuth()
  
   return useQuery({
        queryKey:["current"],
        queryFn:()=> getcurrentuser(token),
        enabled:!!token
    })
}
 export const getAllchatsquery  = (current:string)=>{
  const {token} = userAuth()
   return useQuery({
        queryKey:["allchats"],
        queryFn:()=> getAllchats(token, current),
        enabled:!!current
    })
}
 export const getAllMessagesquery  = (chatid:string)=>{
  const {token} = userAuth()
   return useQuery({
        queryKey:["allchats", {chatid}],
        queryFn:()=> getAllmessges(token, chatid),
        staleTime:50000,
        // enabled:!!chatid
    })
}


