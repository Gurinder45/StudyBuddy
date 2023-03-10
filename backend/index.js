const e = require('express')
const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect("mongodb://cmpt372:TimeToStudy@34.170.98.49:27017", {
    useNewUrlParser:true, useUnifiedTopology:true
},(err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("Successfully connected")
        }
    }
)



app.listen(3000, ()=>{
    console.log("on port 3000")
})

//admin:WebDevIsFun@34.170.98.49:27017/?authMechanism=DEFAULT