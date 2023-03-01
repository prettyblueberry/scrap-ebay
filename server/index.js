import express from "express";
import morgan from "morgan";
import path from "path";
import "./src/helpers/global.helper.js";
import apiRouter from "./src/router/index.js";
import cors from 'cors';

const port = 3001;
const app = express()

app.use(morgan("dev"));
app.use(cors());
//api router
app.use('/api', apiRouter);

//index.html
app.use(express.static('dist'))
app.use(function(req, res){
    res.sendFile(path.resolve('./dist/index.html'));
});


app.listen(port, ()=>{
    console.log("server is running on port " + port + ".");
});