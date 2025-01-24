import express from "express";
import admin_middleware from "./../middlewares/admin-middleware.js";
import { changeOrderStatus } from "./../controllers/order-controller.js";
import protectRoute from "./../middlewares/protected-route.js";
const admin_routes = express.Router();

admin_routes.post(
  "/order-status/:id",
  protectRoute,
  admin_middleware,
  changeOrderStatus
);

export default admin_routes;
