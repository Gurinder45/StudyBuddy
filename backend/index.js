
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require("./user.model")
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.get('/', (req,res)=>{
    console.log("reached");
    res.json(200);
})


// var createUser = async() =>{
//     var bob = new User({
//         uname: "bob",
//         password: "12"
//     })

//     try{
        
//         await bob.save()
//         console.log('done!')
//     }
//     catch(e){
//         console.log("SORRY")
//         console.log(e.codeName)
//     }
//     process.exit()
// }

// createUser()


app.post('/sendLogin', async (req, res)=>{
    console.log("next is the req body")
    let { username, password } = req.body;
    console.log(username, password)
    res.status(200).json(req.body);
    let newU = new User;
    newU.username = username;
    newU.password = password;
    await newU.save();
    // res.json(req.body)
    // res.json({status:"ok"})
})

app.listen(1234, ()=>{
    console.log('** Server Starting **')
})

