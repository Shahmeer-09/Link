import { Button } from "@nextui-org/react";

const SenderProfile = () => {
  return (
    <div className=" h-full lg:w-[20%] lg:block hidden   border-l-zinc-300 border-l-1 p-3  ">
      <div className=" my-auto flex flex-col items-center mt-[60px]  ">
        <img
          src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
          className=" rounded-full h-[170px] w-[170px] "
        />
        <div className=" flex flex-col gap-3 text-center mt-6">
          <h5 className=" font-semibold ">Sender name</h5>
          <p>shahmeer@gmail.com</p>
          <Button className="bg-yellow-500 text-zinc-100 px-3">
            clear conversation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SenderProfile;

// bg-yellow-500  hidden sm:hidden md:block  md:col-span-2
