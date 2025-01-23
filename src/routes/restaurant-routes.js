import express from "express";
import protectRoute from "./../middlewares/protected-route.js";
import {
  createRestaurant,
  getAllRestaurants,
  getRestaurant,
  deleteRestaurant,
} from "./../controllers/restaurant-controllers.js";

const restaurant_routes = express.Router();

restaurant_routes.post("/add-restaurant", protectRoute, createRestaurant);
restaurant_routes.get("/all-restaurants", getAllRestaurants);
restaurant_routes.get("/:name", getRestaurant);
restaurant_routes.delete("/delete/:name", protectRoute, deleteRestaurant);
export default restaurant_routes;
