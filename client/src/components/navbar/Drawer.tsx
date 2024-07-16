import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Input } from "../input";

import Customfetch from "../../utils/Customfetch";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { userAuth } from "../../providers/Authprovider";
import SearchCard from "./SearchCard";
import { type searchuser } from "./SearchCard";
import { Spinner } from "@nextui-org/react";
import currentUser from "../../Atoms/currentUser";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useQueryClient } from "@tanstack/react-query";
import toreratom from "../../Atoms/toReqAtom";
import { RxCross1 } from "react-icons/rx";

const Search = () => {
  const { token } = userAuth();
  const QueryClient = useQueryClient();

  const currentuser = useRecoilValue(currentUser);
  const [isOpen, setIsOpen] = useState(false);
  const [searchinput, setsearch] = useState("");
  const [useresult, setuserReult] = useState([]);
  const [loading, setloading] = useState(false);
  const debounceTimeoutRef = useRef<any>(null);
  const [sending, setsending] = useState(false);
  const settoreq = useSetRecoilState(toreratom);

  

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const searchUSer = async (query: string) => {
    setloading(true);
    try {
      if (query == "") {
        setloading(false);
        setuserReult([]);
      }
      if (token && query !== "") {
        const Users = await Customfetch.post(
          `/user/searchusers`,
          { query, current: currentuser._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setloading(false);

        setuserReult(Users.data.data);
      }
    } catch (error) {
      setloading(false);
      setuserReult([]);
      const err = error as AxiosError;
      const newerror = err.response?.data as any;
      toast.error(newerror.message);
    }
  };

  const debounce = (func: Function, delay: number) => {
    return function (...args: any) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  const searchdebounce = debounce(searchUSer, 500);

  const SendMessagereq = async (userid: string) => {
    try {
      setsending(true);
      const res = await Customfetch.post(
        "/user/sendreq",
        { current: currentuser._id, userid },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      settoreq(res?.data?.data);
      setsending(false);
      QueryClient.invalidateQueries({ queryKey: ["current"] });
      toast.success("request sent");
    } catch (error) {
      setsending(false);
      const err = error as AxiosError;
      const newerror = err.response?.data as any;
      toast.error(newerror.message);
    }
  };

  return (
    <>
      <div className=" flex bg-zinc-100 rounded-md w-[80%] mx-auto px-2 ">
        <BsSearch className=" bg-transparent  h-8 " />
        <Input
          type="text"
          className="  text-xs bg-transparent py-2  "
          placeholder="search user... "
          onClick={toggleDrawer}
        />
      </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="drawer"
        style={{ width: "320px" }}
      >
        <div className=" w-[80%] mx-auto h-full    ">
          <div className=" m-4 absolute top-0 right-0 ">
            <RxCross1
              className=" hover:text-red-500 cursor-pointer"
              onClick={toggleDrawer}
            />
         
            </div>
          <div className=" w-full mt-10 ">
            <div className="  flex bg-zinc-200 rounded-md  w-[90%] mx-auto px-2 ">
              <BsSearch className=" bg-transparent  h-8 " />
              <Input
                type="text"
                value={searchinput}
                onChange={(e) => {
                  setsearch(e.target.value);
                  searchdebounce(e.target.value);
                }}
                className="  text-xs bg-transparent py-2 "
                placeholder="search user... "
              />
            </div>
            <div className=" p-3 mt-3   ">
              {loading && (
                <div className=" h-[200px] flex items-center justify-center  w-full  ">
                  <Spinner className=" " size="lg" color="warning" />
                </div>
              )}
              {!loading && useresult.length == 0 && (
                <p className=" text-center text-sm text-yellow-300 ">
                  No user to show
                </p>
              )}
              {!loading &&
                useresult.length != 0 &&
                useresult.map((user: searchuser) => (
                  <div
                    key={user._id}
                    className={` ${
                      sending ? " cursor-wait" : "cursor-pointer"
                    } `}
                    onClick={() => SendMessagereq(user?._id)}
                    aria-disabled={sending}
                  >
                    <SearchCard user={user} />
                  </div>
                ))}
            </div>
          </div>
          <div className=" w-full h-full mt-4">{/* Content */}</div>
        </div>
      </Drawer>
    </>
  );
};

export default Search;
