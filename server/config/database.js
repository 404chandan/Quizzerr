const mongoose = require("mongoose")
require("dotenv").config();

exports.connectToDB = () => {
    mongoose.connect(process.env.DB_URL,{})
    .then(() => {
        console.log("Database connection successfull")
    })
    .catch((e) => {
        console.log("Error occurred while connecting to DB")
        console.error(e);
        process.exit(1);
    })
} 