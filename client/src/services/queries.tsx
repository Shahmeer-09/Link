import {useQuery} from "@tanstack/react-query"

import { getcurrentuser } from "./api"
import { userAuth } from "../providers/Authprovider"

 export const getcurrentquery  = ()=>{
  const {token} = userAuth()
   return useQuery({
        queryKey:["current"],
        queryFn:()=> getcurrentuser(token),
        enabled:!!token
    })
}