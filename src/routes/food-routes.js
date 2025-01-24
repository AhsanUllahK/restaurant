import express from "express";
import protectRoute from "./../middlewares/protected-route.js";
import {
  addFood,
  getAllFoods,
  getFoodById,
  deleteFood,
  updateFood,
} from "./../controllers/food-controller.js";

const food_routes = express.Router();

food_routes.post("/add-food", addFood);
food_routes.get("/all-foods", getAllFoods);
food_routes.get("/:id", getFoodById);
food_routes.put("/:id", protectRoute, updateFood);
food_routes.delete("/:id", deleteFood);
export default food_routes;
