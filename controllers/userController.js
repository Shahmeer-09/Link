const { badReqError, NotfoundError } = require("../utils/Customerrors");
const Apiresponse = require("../utils/Apiresponse");
const User = require("../model/User.model");
const { StatusCodes } = require("http-status-codes");
const { default: mongoose } = require("mongoose");

const getCurrent = async (req, res) => {
  const { uid } = req.user;
  const user = await User.findOne({ userid: uid })
    .populate("toReq.user")
    .populate("fromReq");
  if (!user) {
    return new NotfoundError("User not found");
  }
  res.status(200).json(new Apiresponse(StatusCodes.OK, user, "current user"));
};

const registerUser = async (req, res) => {
  const { name, email, image, userid } = req.body;

  if (!name || !email || !image || !userid) {
    return new badReqError("Please fill all the fields");
  }
  const user = await User.create({ name, email, Avatar: image, userid });
  if (!user) {
    return new badReqError("Something went wrong");
  }
  await user.save();
  res
    .status(201)
    .json(
      new Apiresponse(StatusCodes.OK, null, "Account created  successfully")
    );
};
const searchAllusers = async (req, res) => {
  const current = req.body.current;
  const search = req.body.query;
  if (!search == "") {
    const users = await User.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    }).select("name email Avatar _id");
    if (!users) {
      return new badReqError("no user found with this name or email");
    }
    const validUsers = users.filter((user) => user._id.toString() != current);

    res
      .status(200)
      .json(new Apiresponse(StatusCodes.OK, validUsers, "users found"));
  }
};

const sendRequest = async (req, res) => {
  const { current, userid } = req.body;

  const user = await User.findById({ _id: userid });
  if (!user) {
    return new NotfoundError("user not found");
  }
  if (!user.fromReq.includes(current)) {
    user.fromReq.push(current);
  }
  await user.save();
  const currentUser = await User.findOne({ _id: current });
  if (!currentUser.toReq.find((obj) => obj.user.toString() == userid)) {
    currentUser.toReq.push({ user: userid });
  }
  await currentUser.save();
  res.status(200).json(new Apiresponse(StatusCodes.OK, null, "request sent"));
};

const resendReq = async (req, res) => {
  const { current, userid } = req.body;
  const currentUser = await User.findOneAndUpdate(
    { _id: current, "toReq.user": userid },
    {
      $set: {
        "toReq.$.status": "pending",
      },
    },
    {new:true}
  ).populate("toReq.user");
  console.log(currentUser); 
  if (!currentUser) {
    return new NotfoundError("user not found");
  }
  await currentUser.save();
  const user = await User.findById({ _id: userid });
  if (!user) {
    return new NotfoundError("user not found");
  }
  if (!user.fromReq.includes(current)) {
    user.fromReq.push(current);
  }
  await user.save();
  res.status(200).json(new Apiresponse(StatusCodes.OK, currentUser?.toReq, "request resent"));
};
const accepRequest = async (req, res) => {
  const { current, userid } = req.body;
  const user = await User.findOne({ userid });
  if (!user) {
    return new NotfoundError("user not found");
  }
  user.toReq = user.toReq.filter((obj) => obj.user != current);
  await user.save();
  const currentUser = await User.findOne({ userid: current });
  if (!currentUser) {
    return new NotfoundError("user not found");
  }
  currentUser.fromReq = currentUser.fromReq.filter((id) => id != userid);
  await currentUser.save();

  res
    .status(200)
    .json(new Apiresponse(StatusCodes.OK, null, "request accepted"));
};
const declineRequest = async (req, res) => {
  const { current: uid, userid } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: userid, "toReq.user": uid },
    {
      $set: {
        "toReq.$.status": "declined",
      },
    }
  );
  if (!user) throw new NotfoundError("user not found ");
  const current = await User.findOneAndUpdate(
    { _id: uid },
    { $pull: { fromReq: userid } },
    { new: true }
  );
  if (!current) throw new NotfoundError("user not found");

  res.status(200).json(new Apiresponse(StatusCodes.OK, null, ""));
};
const removereq = async (req, res) => {
  const { current, userid } = req.body;
  const currentuser = await User.findOne({ _id: current });
  if (!currentuser) {
    return new NotfoundError("user not found");
  }
  currentuser.fromReq.filter((id) => id._id.toString() != userid);
  await currentuser.save();
  const user = await User.findOne({ _id: userid });
  if (!user) {
    return new NotfoundError("user not found");
  }
  if (!user.toReq.find((obj) => obj.user._id.toString() == current))
    user.toReq = user.toReq.filter((obj) => obj.user._id.toString() != current);
  res.status(200).json(new Apiresponse(StatusCodes.OK, null, "removed"));
};

module.exports = {
  registerUser,
  getCurrent,
  searchAllusers,
  sendRequest,
  resendReq,
  removereq,
  accepRequest,
  declineRequest,
};
