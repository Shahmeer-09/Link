import { Button } from "../components/button";
import LandingAnimation from "../components/ui/LandingAnimation";
import { GoArrowRight } from "react-icons/go";
import { Navigate, useNavigate } from "react-router-dom";
import { userAuth } from "../providers/Authprovider";
const LandingPage = () => {
  const { user, loading } = userAuth();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("auth");
  };

  return (
    <>
      {!loading && user ? (
        <Navigate to={"chat"} />
      ) : (
        !loading &&
        <div className=" h-[100vh] overflow-hidden relative w-[100vw]   border  border-gray-800    ">
          <div className=" md:h-[600px] md:w-[600px] z-10  hidden md:block  bg-yellow-500 absolute rotate-360 md:left-[-300px]  md:top-[-300px] row-start-2 rotate-45   "></div>
          <div className=" md:h-[600px] md:w-[600px] bg-cyan-300 z-10 absolute rotate-360 right-[-300px]  hidden  md:block md:bottom-[-300px] row-start-2 rotate-45   "></div>
          <div className=" flex bg-zinc-100 text-center    items-center justify-center  ">
            <div>
              <div className=" text-center  sm:w-[350px] sm:h-[350px] w-[280px] h-[280px] ">
                <LandingAnimation />
              </div>
              <h1 className="tracking-in-expand  font-semibold mb-4  ">
                LinkUp
              </h1>
              <Button
                onClick={handleClick}
                disabled={loading}
                className=" hover:bg-cyan-300 flex items-center landingbutton bg-cyan-200 text-cyan-800 sm:w-[400px] w-[300px]    "
              >
                Make and account or login
                <GoArrowRight className=" ml-2 transition-all  size-4  bg-transparent  landingicon " />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;
