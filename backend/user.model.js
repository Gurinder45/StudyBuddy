const mongoose = require('mongoose')

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, required:true},
    password: {type:String, minlength: 2, required:true},
    university:{type: String, required:true},
    courses: {type: [String], required:true},
    buddies: {type: [String]},
    location: {
        type: {
          type: String, 
          enum: ['Point'], 
          required: false
        },
        coordinates: {
          type: [Number],
          required: false
        },
        required: false
    },
    
    //matchedbuddies: [{ type: [Schema.Types.ObjectId], ref: 'User',required: false }]//reference to other users
})

module.exports = mongoose.model("user", userSchema)
