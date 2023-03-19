const mongoose = require('mongoose')

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, required:true},
    password: {type:String, minlength: 2, required:true},
    university:{type: String, required:true},
    courses: {type: [String], required:true},
    /*
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        },
        required: false
    },
    */
    //matchedbuddies: [{ type: [Schema.Types.ObjectId], ref: 'User',required: false }]//reference to other users
})

module.exports = mongoose.model("user", userSchema)
