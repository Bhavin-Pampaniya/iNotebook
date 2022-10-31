const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/inotebook")
    .then(()=>console.log("connected to mongo"))
    .catch((e)=>console.log(e))

