import express from "express";
import cors from "cors";
import { corsOptions } from "./config/cors.js";
import authRoutes from "./routes/authRoutes.js";
import skillRoutes from "./routes/skillPostRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";

const app = express();

// CORS Configuration for deployment
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/sessions", sessionRoutes);

export default app;
