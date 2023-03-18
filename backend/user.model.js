const mongoose = require('mongoose')

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, required:true},
    password: {type:String, minlength: 2, required:true},
    university:{type: String, required:true},
    courses: {type: String, required:true}
})

module.exports = mongoose.model("user", userSchema)
