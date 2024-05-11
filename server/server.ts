import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import handleAllError from "./src/middleware/error-handler";
import ConnectMongoDb from "./mongoConnection";
import { serverStatus } from "./src/middleware/express-status";
import session from "express-session";
import blogRouter from "./src/router/blog.router";
import { authenticate } from "./src/middleware/requireAuth";
import authRouter from "./src/router/auth.router";
import superAdminRouter from "./src/router/superAdmin.router";
dotenv.config();
const app: Express = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS, especially with sameSite: 'None'
      httpOnly: true,
      maxAge: 3600000,
      sameSite: 'lax', // Or 'None' if necessary
    },
  })
);
app.use(morgan("dev"));
app.use(cors());

ConnectMongoDb(app);

app.get("/", serverStatus);

app.use("/api/auth", authRouter);

//user must be authenticated
app.use(authenticate);

app.use("/api/blog", blogRouter);
app.use("/api/super-admin", superAdminRouter);
app.use(handleAllError);
