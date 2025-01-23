import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import auth_routes from "./routes/auth-routes.js";
import user_routes from "./routes/user-routes.js";
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/", auth_routes);
app.use("/api/user/", user_routes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Example app listening on port ${PORT}!`);
});

// cors ==> enables our nodejs server to connect with other port.
