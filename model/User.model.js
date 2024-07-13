const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ToReqSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'declined'],
    default: 'pending'
  }
});

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    Avatar: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
    },
    toReq: [ToReqSchema],
    fromReq: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
module.exports = User;
