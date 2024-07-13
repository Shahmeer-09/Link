import { Button } from "../components/button";
import { InputPwd } from "../components/input";
import regimage from "../assets/pwd.jpg";
import regimage2 from "../assets/auth.jpg";
import Pwdresethook from "../Hooks/Pwdresethook";
import { Link } from "react-router-dom";
import { userAuth } from "../providers/Authprovider";
import { Navigate } from "react-router-dom";
const PasswordReset = () => {
  const { user, loading: authload } = userAuth();
  const { register, handleSubmit, loading, errors, onSubmit } = Pwdresethook();

  return (
    <>
      {!authload && user ? (
        <Navigate to={"/chat"} />
      ) : (
        !authload &&
        <main className=" h-[100vh] w-screen flex  justify-center items-center   ">
          <div className="absolute h-full w-ful  brightness-75  ">
            <img
              className="    h-[100%] w-screen object-cover  "
              src={regimage2}
              alt=""
            />
          </div>

          <div
            className={
              "shadow-xl   sm:max-w-[600px] backdrop-blur-md  max-w-[400px] w-[90%] bg-transparent z-10  flex rounded-lg "
            }
          >
            <div className=" hidden sm:block rounded-lg  w-[40%]">
              <img
                className=" object-contain object-center  rounded-s-lg  h-full w-full  "
                src={regimage}
                alt=""
              />
            </div>
            <div className=" sm:w-[60%] w-[100%] bg-transparent px-2  sm:px-4 ">
              <p className=" bg-transparent font-bold  sm:text-lg text-xl   font-sans  mt-10  text-yellow-500 text-center ">
                Reset password
              </p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                action=""
                className=" bg-transparent  justify-center  items-center  h-[80%]   flex flex-col sm:px-10 px-4  "
              >
                <InputPwd
                  className=" "
                  placeholder="Enter your password"
                  {...register("password")}
                />

                {errors.password && (
                  <span className=" text-red-500 self-start  text-xs  bg-transparent ">
                    {errors.password.message}
                  </span>
                )}
                <InputPwd
                  placeholder="confirm password"
                  {...register("consfirPwd")}
                />

                {errors.consfirPwd && (
                  <span className=" text-red-500 self-start  text-xs  bg-transparent ">
                    {errors.consfirPwd.message}
                  </span>
                )}

                <Button
                  disabled={loading}
                  type="submit"
                  className=" hover:bg-cyan-500  w-full  text-cyan-800  bg-cyan-400 mt-6 mb-4   text-xs h-7   "
                >
                  {loading ? "Loading..." : "Reset"}
                </Button>
                <p className=" bg-transparent text-xs text-white self-start mb-4  ">
                  Go back to sign-in:{" "}
                  <Link
                    className=" bg-transparent text-cyan-400  "
                    to={"/auth"}
                  >
                    sign-in
                  </Link>{" "}
                </p>
              </form>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default PasswordReset;
