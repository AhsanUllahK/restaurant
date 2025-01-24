import express from "express";
import protectRoute from "./../middlewares/protected-route.js";
import { placeOrder } from "./../controllers/order-controller.js";
const order_routes = express.Router();

order_routes.post("/place-order/:id", protectRoute, placeOrder);
export default order_routes;
