import express from "express";
import mongoose from "mongoose";
import {MongoAPI} from "./cred.js"

const app = express();
mongoose.connect(MongoAPI
).then(() => app.listen(5000))
.then(() => 
    console.log("Server is running on port 5000")
)
.catch((error) => console.log(error));










