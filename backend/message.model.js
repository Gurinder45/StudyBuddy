const mongoose = require('mongoose')

var Schema = mongoose.Schema;

// Only two required fields
// userSent is the user who sent the request
// userTo is the user who received the request
// Users are buddies when they each have an entry
// for each other in the database
var messageSchema = new Schema({
    chatId: {type: String, required: true},
    fromUser: {type: String, required: true},
    body: {type: String, required: true},
    sent: {type: Date, default: Date.now, required: true}
})

module.exports = mongoose.model("message", messageSchema)
