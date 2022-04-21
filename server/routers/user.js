const express =require("express");
const UserController= require("../controllers/user");

const api = express.Router();
api.post("/sing-up",UserController.signUp);
api.post("/sing-in",UserController.signIn);

module.exports=api;