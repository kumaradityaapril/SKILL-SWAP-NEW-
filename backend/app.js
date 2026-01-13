import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import skillRoutes from "./routes/skillPostRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);


export default app;
