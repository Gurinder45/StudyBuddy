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
        let query = await User.findOne({username: "fan"});
        socket.emit('hello', query);
    });
};