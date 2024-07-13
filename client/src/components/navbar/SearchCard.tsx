import { Avatar } from "@nextui-org/react";

export interface searchuser{
    name:string,
    email:string ,
    _id:string,
    Avatar:string,
}
export interface searchcardprops{
    user:searchuser
}
const SearchCard= ({user}:searchcardprops) => {
  return (
    <div className=" rounded-xl flex items-center px-2 py-1 bg-zinc-200 mb-2  ">
      <Avatar src={user.Avatar} size="sm" isBordered />
      <div className=" ml-4 flex flex-col  bg-transparent">
        <p className="text-xs text-zinc-700  font-semibold bg-transparent  ">{user.name}</p>
        <span className=" text-xs text-zinc-400 bg-transparent  ">{user.email}</span>
      </div>
    </div>
  );
};

export default SearchCard;
