import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import skillRoutes from "./routes/skillPostRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/requests", requestRoutes);


export default app;
