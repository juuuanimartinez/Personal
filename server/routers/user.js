const express =require("express");
const UserController= require("../controllers/user");

const api = express.Router();
api.post("/sing-up",UserController.signUp);
api.post("/sing-in",UserController.signIn);
api.get("/users",UserController.getUsers);
api.get("/users",UserController.getUsers);

module.exports=api;