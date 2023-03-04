import express from "express";
import morgan from "morgan";
import path from "path";
import "./src/helpers/global.helper.js";
import apiRouter from "./src/router/index.js";
import cors from 'cors';
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import {jwtSession} from "./src/middlewares/auth.middleware.js";
import scheduleController from "./src/controllers/schedule.controller.js";

dotenv.config();
let port;

if(process.env.NODE_ENV === "development"){
   port = process.env.DEV_PORT;
} else port = process.env.PORT;

const app = express()

app.use(morgan("dev"));
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(jwtSession);
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

scheduleController.setScheduleJob();