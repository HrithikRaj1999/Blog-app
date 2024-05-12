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
import userRouter from './src/router/user.route';
dotenv.config();
const app: Express = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "PATCH", "GET", "DELETE", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    name: "SESSION",
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: false,
      httpOnly: false,
      secure: false,
    },
  })
);
app.use(morgan("dev"));

ConnectMongoDb(app);

app.get("/", serverStatus);

app.use("/api/auth", authRouter);

//Form here onward user must be authenticated
app.use(authenticate);

app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);

app.use("/api/super-admin", superAdminRouter);
app.use(handleAllError);
