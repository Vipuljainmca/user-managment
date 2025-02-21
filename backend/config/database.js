const mongoose = require("mongoose");

require("dotenv").config();

const mongoURI = process.env.MONGO_URI;


exports.connect = () => {
    // mongoose.connect("mongodb://localhost:27017/real-estate-crm")
    mongoose.connect(mongoURI)
    .then(()=> {console.log("db connected successfully")})
    .catch((err)=> {
        console.log("db connection issue");
        console.log(err)
        process.exit(1);
    });
}