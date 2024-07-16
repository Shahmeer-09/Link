import Customfetch from "../utils/Customfetch";
import { type selectedChat } from "../Atoms/SelectedchatAtom";
const getcurrentuser = async (token: string) => {
  const response = await Customfetch.get(`/user/current/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status != 200) {
    throw new Error(response.data.message);
  }
  const current = response.data.data;
  return current;
};

const getAllchats = async (token: string, current: string) => {
  const response = await Customfetch.get(
    `/chat/allchats/?current=${current}`,
   
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.data?.success===false) {
    throw new Error(response.data.message);
  }
  const allchats:selectedChat[] = response.data.data;
  return allchats;
};

const getAllmessges = async (token: string, chatid: string) => {
  const response = await Customfetch.get(`/msg/allmsgs/?chatid=${chatid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status != 200) {
    throw new Error(response.data.message);
  }
  const messages = response.data.data;
  return messages;
};

export { getcurrentuser, getAllchats ,getAllmessges};
