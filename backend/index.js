const express = require('express')
const mongoose = require('mongoose')
const app = express()

const uri = "mongodb://cmpt372:TimeToStudy@34.170.98.49:27017"
// let MongoClient = require('mongodb').

mongoose.set('strictQuery', true);

mongoose.connect(uri,{useNewUrlParser: true})
var db = mongoose.connection
console.log("AFTER CONNECTING DB", db)
db.on('error', console.error.bind(console, "connection error"))

// 



var Schema = mongoose.Schema;

var userSchema = new Schema({
    uname: {type: String},
    password: {type:String, minlength: 2}
})

var User = mongoose.model("user", userSchema)

var createUser = async() =>{
    var bob = new User({
        uname: "bob",
        password: "12"
    })

    try{
        
        await bob.save()
        console.log('done!')
    }
    catch(e){
        console.log("SORRY")
        console.log(e.codeName)
    }
    process.exit()
}

createUser()

//admin:WebDevIsFun@34.170.98.49:27017/?authMechanism=DEFAULT