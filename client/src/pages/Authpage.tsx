import Login from "../components/ui/Login";
import Register from "../components/ui/Register";
import authSwitch from "../Atoms/Authswitch";
import { useRecoilValue } from "recoil";
import { userAuth } from "../providers/Authprovider";
import { Navigate } from "react-router-dom";
const Authpage = () => {
  const authswitch = useRecoilValue(authSwitch);
  const { user, loading } = userAuth();
  return (
    <>
      {!loading && user ? (
        <Navigate to={"/chat"} />
      ) : (
        !loading &&
        <div className=" bg-zinc-100 flex justify-center items-center h-screen   ">
          {authswitch ? <Login /> : <Register />}
        </div>
      )}
    </>
  );
};

export default Authpage;
