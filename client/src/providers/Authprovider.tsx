import React, { useEffect, useState } from "react";
import { useContext, createContext } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../utils/firebase";


interface AuthContextProps {
  user:User|null;
  loading: boolean;
  sentreq: boolean;
  recieved: boolean;
  token: string;

  setSentreq: React.Dispatch<React.SetStateAction<boolean>>;
  setRecieved: React.Dispatch<React.SetStateAction<boolean>>;
}
type authprops = {
  children: React.ReactNode;
};
const AuthContext = createContext({} as AuthContextProps);
export const userAuth = () => useContext(AuthContext);

const Authprovider: React.FC<authprops> = ({ children }) => {
  const [user, setuser] = useState<User|null>(null);
  const [sentreq, setSentreq] = useState(false);
  const [recieved, setRecieved] = useState(false);
  const [loading, setloading] = useState(true);
  const [token, settoken] = useState("");

 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setuser(user);
      const gettoken = () => {
        return user?.getIdToken();
      };
      gettoken()
        ?.then((data) => {
          settoken(data);
        })
        .catch((err) => {
          console.log(err);
        });
      setloading(false);
    });
    return () => unsubscribe();
  }, []);
 

  const value = {
    user,
    loading,
    sentreq,
    recieved,
    setSentreq,
    setRecieved,
    token,
  
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default Authprovider;


