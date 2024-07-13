import {Badge, Button} from "@nextui-org/react";
import { IoNotificationsSharp } from "react-icons/io5";
const NotificationIcon = () => {
  return (
    <Badge size="sm" className="text-white" content="10+" shape="circle" color="warning">
    <Button
      radius="full"
      isIconOnly
      aria-label="more than 99 notifications"
      variant="light"
    >
      <IoNotificationsSharp className="text-zinc-600  " size={21} />
    </Button>
  </Badge>
  )
}

export default NotificationIcon