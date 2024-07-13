
const MessageCard = () => {
  return (
    <div className=" flex self-end flex-col w-[300px]  md:w-[400px]  ">
       <span className="rounded-2xl text-xs text-zinc-500 bg-cyan-400 py-3
       px-4 ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis, ratione?
       </span>
       <div className="w-full  ">
        <span className=" ml-[90%] text-[10px] items-end  text-zinc-400" >12:30</span>
       </div>
    </div>
  );
};

const RecieverCard = () => {
  return (
    <div className=" flex  self-start flex-col md:w-[400px] w-[300px]   ">
       <span className="  rounded-2xl text-xs text-zinc-500 bg-zinc-200 py-3
       px-4 ">
          Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, ut.  adipisicing elit. Perferendis, ratione? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, veniam.
       </span>
       <div className="">
        <span className="  text-[10px] ml-[18px] text-zinc-400" >12:30</span>
       </div>
    </div>
  );
};
export { RecieverCard, MessageCard };


