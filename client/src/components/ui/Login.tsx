import { Button } from "../button";
import { Input, InputPwd } from "../input";
import regimage from "../../assets/regimage.png";
import authSwitch from "../../Atoms/Authswitch";
import { useSetRecoilState } from "recoil";
import LoginHook from "../../Hooks/LoginHook";
import Pwdreset from "./pwdrstemailComp";
import regimage2 from "../../assets/auth.jpg";
const Login = () => {
  const { onSubmit, errors, loading, register, handleSubmit } = LoginHook();
  const setswitch = useSetRecoilState(authSwitch);

  return (
    <main className=" h-[100vh] w-screen   flex justify-center items-center  " >
     <div className="absolute h-full w-ful  brightness-75  " >
        <img  className="    h-[100%] w-screen object-cover  " src={regimage2} alt="" />
     </div>
    <div
      className={
        "shadow-xl sm:max-w-[600px] backdrop-blur-md  max-w-[400px] w-[90%] bg-transparent z-10  flex rounded-lg "
      }
    >
      <div className=" hidden sm:block rounded-lg  w-[40%]">
        <img
          className=" object-contain object-center  rounded-s-lg  h-full w-full  "
          src={regimage}
          alt=""
        />
      </div>
      <div className=" sm:w-[60%] w-[100vw]  bg-transparent px-2  pb-10 sm:px-4 ">
        <p className=" bg-transparent font-bold  sm:text-lg text-xl   font-sans  mt-10  text-yellow-500 text-center ">
          Sign in
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className=" bg-transparent  justify-center  items-center  h-[80%]   flex flex-col sm:px-10 px-4  "
        >
          <Input
            type="email"
            className="mt-3 rounded-lg "
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <span className=" text-red-500  self-start text-xs  bg-transparent ">
              {errors.email.message}
            </span>
          )}
          <InputPwd
            className=" "
            placeholder="Enter your password"
            {...register("password")}
          />

          {errors.password && (
            <span className=" text-red-500 self-end  text-xs  bg-transparent ">
              {errors.password.message}
            </span>
          )}

          <Pwdreset />

          <Button
            disabled={loading}
            type="submit"
            className=" hover:bg-cyan-500  w-full  text-cyan-800  bg-cyan-400 my-2   text-xs h-7   "
          >
            {loading ? "Loading..." : "Login"}
          </Button>
          <p className=" text-xs text-white self-start  bg-transparent sm:m-0 mb-4 ">
            Dont have an account?
            <span
              onClick={() => setswitch(false)}
              className=" cursor-pointer text-cyan bg-transparent text-cyan-500"
            >
              signup
            </span>
          </p>
        </form>
      </div>
    </div>
    </main>
  );
};

export default Login;
