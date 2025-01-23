import express from "express";
import { signup, signin, signout } from "./../controllers/auth-conroller.js";

const auth_routes = express.Router();

auth_routes.post("/signup", signup);
auth_routes.post("/login", signin);
auth_routes.get("/logout", signout);
export default auth_routes;
