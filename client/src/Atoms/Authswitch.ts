import {atom} from "recoil"
type authstate = boolean
const authSwitch = atom<authstate>({
    key: "authSwitch",
    default :true

})
export default authSwitch