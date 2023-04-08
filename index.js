import express from "express";
import dotenv from "dotenv";
import { create } from "express-handlebars";
import connectDB from "./config/db.js";
import session from "express-session";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import helmet from "helmet";


import userMiddleware from "./middleware/userMiddleware.js";
import tokenMiddleware from "./middleware/tokenMiddleware.js";
import hbsHelper from "./utils/option.js";

// IMPORT ROUTES
import authRoutes from "./routes/auth.js";
import productsRoute from "./routes/products.js";

dotenv.config();
const app = express();

// View Engine
const hbs = create({ defaultLayout: "main", extname: "hbs", helpers: hbsHelper });
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({secret: "Boom", resave: false, saveUninitialized: false}));
app.use(flash());
app.use(tokenMiddleware);
app.use(userMiddleware);
app.use(helmet());

// Router
app.use(authRoutes);
app.use(productsRoute);

connectDB();

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
