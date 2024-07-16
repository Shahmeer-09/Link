const { StatusCodes } = require("http-status-codes");
const Chat = require("../model/Chat.model");
const Apiresponse = require("../utils/Apiresponse");
const { NotfoundError, badReqError } = require("../utils/Customerrors");
const getAllChats = async (req, res) => {
  const { current } = req.query;
  if (!current) {
    throw new badReqError("Please provide a user id");
  }

  const allchats = await Chat.find({ members: { $in: [current] } })
    .populate("members")
    .populate({
      path: "latestMessage",
      populate: {
        path: "sender",
        select: "name email Avatar",
      },
    })
    .sort({ updatedAt: -1 });;
  if (!allchats) {
    throw new NotfoundError("Chats not found");
  }
  res
    .status(200)
    .json(new Apiresponse(StatusCodes.OK,allchats, "All Chats" ));
};

module.exports = { getAllChats };
