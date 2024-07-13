import Profilemodal from "./Profilemodal";
import  Navpop  from "./DropDnav";
import NotificationIcon from "./NotificationIcon";
const Navbar = () => {
  return (
    <nav className=" h-[50px] border-b-zinc-200 border-1 flex w-full p-2 px-3 justify-between items-center  ">
      <div className=" ml-2 ">
        <p className=" text-2xl text-yellow-500 font-bold ">
          Link<span className="text-cyan-400 ">Up</span>
        </p>
      </div>
      <div className="mr-4 flex gap-4 items-center ">
        <Navpop />
        <NotificationIcon/>
         <Profilemodal/>
      </div>
    </nav>
  );
};

export default Navbar;
