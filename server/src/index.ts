import express from "express";
import cors from "cors";
import { rootRouter } from "./routes";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

config();
const app = express();
const DATABASE_URL: string = process.env.DATABASE_URL || "";
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/api/v1", rootRouter);

app.get("/", (req, res) => {
  try {
    res.status(200).send("Server is working");
  } catch (error) {
    res.status(500).send("Internal server found.");
  }
});

mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("DB connection successful."))
  .catch((err) => console.log(err.message));

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
