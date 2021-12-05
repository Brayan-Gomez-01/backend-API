import express from "express";
import cors from "cors";
import {githubRepositories} from "./github";
import {register} from "./register";
import {login} from "./login";
import {getUserInfo} from "./getUserInfo";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.get("/repo/user/:user/limit/:limit",githubRepositories);
app.get("/user/:username",getUserInfo);
app.post("/user/register",register);
app.post("/user/login",login);

app.listen(3001,()=>{console.log("Server listening on Port 3001")});