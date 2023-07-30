import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config(); //This allows us to pull our environment variables from our .env file

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("Hello there");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_url);
    app.listen(8080, () => {
      console.log("Server has started on port http://localhost:8080");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
