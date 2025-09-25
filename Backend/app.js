import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import internshipRoutes from "./routes/internshipRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: "http://localhost:5173",  // your frontend URL
  credentials: true                 // allow cookies/auth headers
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/internships", internshipRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
