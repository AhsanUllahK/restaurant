import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import auth_routes from "./routes/auth-routes.js";
import user_routes from "./routes/user-routes.js";
import restaurant_routes from "./routes/restaurant-routes.js";
import category_routes from "./routes/category-routes.js";
import food_routes from "./routes/food-routes.js";
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/", auth_routes);
app.use("/api/user/", user_routes);
app.use("/api/restaurant/", restaurant_routes);
app.use("/api/category/", category_routes);
app.use("/api/food/", food_routes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Example app listening on port ${PORT}!`);
});

// cors ==> enables our nodejs server to connect with other port.
