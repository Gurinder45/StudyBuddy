const { Server } = require("socket.io");
const User = require("../user.model");
const Match = require("../match.model");
const Chatroom = require("../chatroom.model");
const Message = require("../message.model");

module.exports =
  /**
   * @param {Server} io
   */
  function (io) {
    io.of("/meet-up").on("connection", async (socket) => {
      console.log("connected")
      //let chatId = socket.handshake.query.chatId;
      //console.log("Received new client for chat: " + chatId);
      //socket.join(chatId);

      socket.on("join room", (room) => {
        console.log(`User ${socket.id} joined room ${room}`);
        socket.join(room);
      });
      socket.on("add-marker", (room,marker) => {
        // emit a "new-marker" event to all connected clients
        console.log(`Message received from user ${socket.id}: ${marker}`);
        console.log(room)
        socket.broadcast.to(room).emit("newmarker", marker);
      });
    });
  };