const { default: mongoose } = require("mongoose");
const Msg = require("../model/Message.model");
const { badReqError, NotfoundError } = require("../utils/Customerrors");
const Apiresponse = require("../utils/Apiresponse");
const { StatusCodes } = require("http-status-codes");
const Chat = require("../model/Chat.model");
const Pusher = require("pusher");
const getallmessages = async (req, res) => {
  const { chatid } = req.query;
  if (!mongoose.isValidObjectId(chatid)) {
    return new badReqError(
      "something went wrong while fetching the chat hsitory"
    );
  }
  const messages = await Msg.find({ chatid: chatid })
    .populate("sender")
    .sort({ createdAt: 1 });
  if (!messages) {
    return new NotfoundError("no messages found");
  }

  res.status(200).json(new Apiresponse(StatusCodes.OK, messages, ""));
};
const sendMessage = async (req, res) => {
  const { current, message, image } = req.body;
  const { chatid } = req.query;

  if (image !== "") {
    const newmsg = await Msg.create({
      sender: current,
      chatid,
      content: message,
      image: image,
    });

    await newmsg.save();
    const fullmsg = await Msg.find({ _id: newmsg._id })
      .populate("sender")
      .populate("chatid");

    

    const chat = await Chat.findById(chatid);
    chat.latestMessage = newmsg._id;
    await chat.save();
    res.status(200).json(new Apiresponse(StatusCodes.OK, fullmsg, ""));
  } else {
    const newmsg = await Msg.create({
      sender: current,
      chatid,
      content: message,
    });
    await newmsg.save();
    const fullmsg = await Msg.find({ _id: newmsg._id })
      .populate("sender").populate("chatid");
      const chat = await Chat.findById(chatid);
      chat.latestMessage = newmsg._id;
      await chat.save();
      res.status(200).json(new Apiresponse(StatusCodes.OK, fullmsg, ""));
    }
    }

const deleMessage = async (req, res) => {
  const { msgid } = req.body;
  const delmsg = await Msg.findByIdAndDelete(msgid);
  if (!delmsg) {
    return new NotfoundError("no message found");
  }
  res.status(200).json(new Apiresponse(StatusCodes.OK, null, ""));
};
const deleConversation = async (req, res) => {
  const { chatid } = req.body;
  const delmsg = await Msg.deleteMany({ chatid });
  if (!delmsg) {
    return new NotfoundError("no message found");
  }
  res.status(200).json(new Apiresponse(StatusCodes.OK, null, ""));
};

module.exports = { getallmessages, sendMessage, deleMessage, deleConversation };
