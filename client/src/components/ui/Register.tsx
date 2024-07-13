import { Button } from "../button";
import { Input, InputPwd } from "../input";
import regimage from "../../assets/regimage.png";
import authSwitch from "../../Atoms/Authswitch";
import { useSetRecoilState } from "recoil";
import RegAvatar from "./RegAvatar";
import RegHook from "../../Hooks/RegHook";
import regimage2 from "../../assets/auth.jpg";
const Register = () => {
  const setswitch = useSetRecoilState(authSwitch);
  const {onSubmit, convertimage, image,loading, errors, register, handleSubmit} = RegHook()
  
  return (
    <main className=" h-[100vh] w-screen flex justify-center items-center    " >
    <div className="absolute h-full w-ful  brightness-75  " >
       <img  className="    h-[100%] w-screen object-cover  " src={regimage2} alt="" />
    </div>
    <div
      className={
        "shadow-xl sm:max-w-[630px] h-[420px]  backdrop-blur-md  max-w-[400px] w-[90%] bg-transparent z-10  flex rounded-lg "
      }
    >
      <div className=" hidden h-[420px] rounded-lg sm:block  w-[40%]">
        <img
          className="  object-fill  rounded-s-lg   object-center h-full      w-full  "
          src={regimage}
          alt=""
        />
      </div>
      <div className=" sm:w-[60%] w-[100vw] bg-transparent  px-2  sm:px-4 ">
        <p className=" bg-transparent font-bold  sm:text-lg text-xl   font-sans  my-3  text-yellow-500 text-center ">
          Make your Account
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" bg-transparent  text-center  flex flex-col sm:px-10 px-4  "
        >
          <RegAvatar convertimage={convertimage} image={image} />
          <Input
            type="text"
            className=" mt-3 rounded-lg  "
            placeholder="Enter your name"
            {...register("name")}
          />
          {errors.name && (
            <p className=" text-red-500  self-start  text-xs bg-transparent ">
              {errors.name.message}
            </p>
          )}
          <Input
            type="email"
            className=" mt-3 rounded-lg  "
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <p className=" text-red-500 self-start text-xs bg-transparent ">
              {errors.email.message}
            </p>
          )}

          <InputPwd
            className=" rounded-s-lg "
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password && (
            <p className=" text-red-500 self-start text-xs bg-transparent ">
              {errors.password.message}
            </p>
          )}
          <Button
          disabled={loading}
            type="submit"
            className=" hover:bg-cyan-500   text-cyan-800  bg-cyan-400 my-3   text-xs h-7   "
          >
           {loading ? "laoding...":"Make account"}
          </Button>
          {errors.root && (
            <p className=" text-red-500 self-start text-xs bg-transparent ">
              {errors.root.message}
            </p>
          )}
          <p className=" text-xs text-white self-start  bg-transparent sm:m-0 mb-4 ">
            already have an account ?
            <span
              onClick={() => setswitch(true)}
              className=" cursor-pointer text-cyan bg-transparent text-cyan-500"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
    </main>
  );
};

export default Register;
