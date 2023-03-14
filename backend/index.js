// const express = require('express')
// const mongoose = require('mongoose')
// const app = express()
// const cors = require('cors')

// app.use(cors())
// app.use(express.json())

// const uri = "mongodb://cmpt372:TimeToStudy@34.170.98.49:27017/studybuddy?authSource=admin"
// mongoose.set('strictQuery', true);
// mongoose.connect(uri,{useNewUrlParser: true})
// var db = mongoose.connection
// db.on('error', console.error.bind(console, "connection error"))

// var Schema = mongoose.Schema;

// var userSchema = new Schema({
//     uname: {type: String},
//     password: {type:String, minlength: 2}
// })

// var User = mongoose.model("user", userSchema)



// app.post('localhost:3000/sendLogin', (req, res)=>{
//     console.log("next is the req body")
//     console.log(req.body)
//     res.json({status:"ok"})
// })

// app.get('/hello', (req,res)=>{
//     res.send('welcome!!')
// })

// app.listen(1234, ()=>{
//     console.log('** Server Starting **')
// })


const mongoose = require('mongoose')
const User = require("./user.model")

mongoose.set('strictQuery', false);
const uri = 'mongodb://cmpt372:TimeToStudy@34.170.98.49:27017/studybuddy?authSource=admin'
const connectParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(uri, connectParams).then(()=> {
    console.log("Connected to DB");
}).catch((e)=>{
    console.log("ERROR: ", e);
})

//only local copy in js program
// const user = new User()
// user.uname = "katie";
// user.password = 12345;
// user.save((err, savedJob)=> {
//     if (err){
//         console.log(err);
//     }
//     else{
//         console.log(savedJob);
//     }
// })

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

