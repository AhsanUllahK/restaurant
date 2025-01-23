import express from "express";
import { addFood } from "./../controllers/food-controller.js";

const food_routes = express.Router();

food_routes.post("/add-food", addFood);
export default food_routes;
