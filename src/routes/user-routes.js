import express from "express";
import {
  getUserController,
  updatePassword,
  deleteAccount,
} from "./../controllers/user-controller.js";
import protectRoute from "./../middlewares/protected-route.js";

const user_routes = express.Router();

user_routes.get("/get-user", protectRoute, getUserController);
user_routes.put("/reset-password", protectRoute, updatePassword);
user_routes.delete("/deleteUser", protectRoute, deleteAccount);
export default user_routes;
