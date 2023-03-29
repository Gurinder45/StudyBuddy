const { Server } = require("socket.io");
const db = require('./db'); // Import the database connection

module.exports = 
/**
 * @param {Server} io 
 */
function(io) {
    io.of('/chat').on('connection', (socket) => {
        
    });
};