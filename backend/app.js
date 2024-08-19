import express from "express";

const app = express();

app.use("/api", (req, res, next) => {
    res.send("hello World");
});

app.listen(8000);








