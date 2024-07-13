import Customfetch from "../utils/Customfetch";
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

export { getcurrentuser };
