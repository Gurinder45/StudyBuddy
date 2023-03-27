const mongoose = require('mongoose')

var Schema = mongoose.Schema;

// Chatroom model will keep track of everything needed for 
var chatroomSchema = new Schema({
    id: {type: String, required: true},
    users: {type: [String], required: true}
})

module.exports = mongoose.model("chatroom", chatroomSchema)
