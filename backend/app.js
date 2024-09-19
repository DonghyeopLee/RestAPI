import express from "express";
import mongoose from "mongoose";
import {MongoAPI} from "./cred.js"
import router  from "./routes/user-route.js";
import blogRouter from "./routes/blog-route.js";


const app = express();

app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter);

mongoose.connect(MongoAPI)
.then(() => app.listen(5001))
.then(() => 
console.log("Server is running on port 5001")
)
.catch((error) => console.log(error));










