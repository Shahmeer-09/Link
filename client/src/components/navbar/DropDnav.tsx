import { MdOutlineMessage } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { HiOutlineInboxIn } from "react-icons/hi";
import { userAuth } from "../../providers/Authprovider";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const DropDnav = () => {
const {setSentreq, setRecieved} = userAuth()
  return (
    <Dropdown className=" bg-transparent ">
      <DropdownTrigger>
        <div className="flex     cursor-pointer items-center gap-1   ">
          <MdOutlineMessage className=" text-yellow-400 " size={22} />
          <span className=" text-xs text-yellow-400 font-semibold ">
            Requests
          </span>
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions"
   
      itemClasses={{

        base: [
          "rounded-md",
          "text-default-500",
          "transition-opacity",
          "data-[hover=true]:text-foreground",
          "data-[hover=true]:bg-default-100",
        ],
      }}
      >
        <DropdownItem key="new">
          <Button
            className=" flex justify-between w-full  bg-yellow-400 "
            size="sm"
            endContent={<IoIosSend className="bg-transparent" />}
            onClick={()=>{
              setSentreq(true)
              setRecieved(false) 
            } }
          >
            Sent requests
          </Button>
        </DropdownItem>
        <DropdownItem key="copy">
          {" "}
          <Button
            className=" flex justify-between mb-2 w-full  bg-yellow-400 "
            size="sm"
            endContent={<HiOutlineInboxIn className="bg-transparent" />}
            onClick={()=>
              {
                setRecieved(true) 
                setSentreq(false)
              }
            }
          >
            Recieved requests
          </Button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
export default DropDnav;


