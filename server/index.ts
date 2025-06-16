import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/db";


import userRoute from "./routes/userRoute";
import adminRoute from "./routes/adminRoute";
import clientRoute from "./routes/clientRoute";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());


// multer

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

 
// Connect to DB
connectDB();

// Routes
app.use("/api/auth", userRoute);
// app.use("/api", uploadRoute);
app.use("/admin", adminRoute);
app.use("/client", clientRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
