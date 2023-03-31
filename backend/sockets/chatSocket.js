const { Server } = require("socket.io");
const User = require('../user.model');
const Match = require('../match.model');
const Chatroom = require('../chatroom.model');
const Message = require('../message.model');

module.exports = 
/**
 * @param {Server} io 
 */
function(io) {
    io.of('/chat').on('connection', async (socket) => {
        let chatId = socket.handshake.query.chatId;
        console.log("Received new client for chat: " + chatId);
        socket.join(chatId);

        socket.on('message', (msg) => {
            console.log(`Message sent to chat (${chatId}): ${msg}`);
            socket.broadcast.to(chatId).emit("response", msg);
        })
    });
};