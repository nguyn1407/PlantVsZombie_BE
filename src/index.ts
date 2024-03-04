import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import mongoose from "mongoose";
import routes from "./routes";
import errorHandle from "./middleware/errorHandle";
import httpStatus from "http-status";
import ApiError from "./utils/ApiError";
import config from "./config/config";
import passport from 'passport';
import jwtStrategy from './config/passport';
import connectDB from "./config/dbConn";
import getEvent from "../src/contracts/listenEvents/plantVsZombieListener";

const app = express();

// connect to mongodb
connectDB();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// sanitize request data
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

setInterval(async () => {
  await getEvent();
}, 4000);


app.use("/", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  const error = new ApiError(httpStatus.NOT_FOUND, "Not found");
  next(error);
});

app.use(errorHandle);

const PORT = config.port || 3000;

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});
