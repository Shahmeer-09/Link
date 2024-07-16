require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const { errormangerhandler } = require("./middlewares/ErrorManager");
const server = require("http").createServer(app);
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api/user", require("./routes/User.route"));
app.use("/api/chat", require("./routes/Chat.route"));
app.use("/api/msg", require("./routes/Msg.route"));
app.use("*", (req, res) => {
  res.status(404).json({ message: " Route not found " });
});
app.use(errormangerhandler);




  const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });


  io.on("connection", (socket) => {  
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {

      socket.join(userData._id.toString());
      socket.emit("connected");
    });

    socket.on("join chat", (room) => {
      socket.join(room.toString());
      console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => {
      console.log(room);
      socket.in(room.toString()).emit("typing");
    });
    
    socket.on("stop typing", (room) => {
      console.log(room);
      socket.in(room.toString()).emit("stop typing");
    });
    socket.on("delmsg", (room) => {
      console.log(room);
      socket.in(room.toString()).emit('deleted');
    });
    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chatid;
      if (!chat.members) return console.log("chat.users not defined");

      chat.members.forEach((id) => {
        if (id.toString() === newMessageRecieved.sender._id.toString()) return;
        socket.in(id).emit("message recieved", newMessageRecieved);
      });
    });

    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  });



  connectDB()
  .then(() => {
    server.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
