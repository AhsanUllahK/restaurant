import express from "express";
import protectRoute from "./../middlewares/protected-route.js";
import {
  addCategory,
  deleteCategory,
  updateCategory,
  getAllCategory,
} from "./../controllers/category-controller.js";

const category_routes = express.Router();

category_routes.post("/add-category", protectRoute, addCategory);
category_routes.get("/get-all", getAllCategory);
category_routes.put("/update/:id", protectRoute, updateCategory);
category_routes.delete("/delete/:id", protectRoute, deleteCategory);
export default category_routes;
