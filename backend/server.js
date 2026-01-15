import "./config/env.js"; // 👈 MUST BE FIRST LINE (no exceptions)

import { createServer } from "http";
import { Server } from "socket.io";
import { socketCorsOptions } from "./config/cors.js";
import connectDB from "./config/db.js";
import app from "./app.js";

connectDB();

const PORT = process.env.PORT || 5000;

// Create HTTP server
const httpServer = createServer(app);

// Setup Socket.IO with CORS configuration
const io = new Server(httpServer, {
  cors: socketCorsOptions,
});

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join video room
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId);
    console.log(`User ${userId} joined room ${roomId}`);

    // Handle disconnection
    socket.on("disconnect", () => {
      socket.to(roomId).emit("user-disconnected", userId);
      console.log(`User ${userId} disconnected from room ${roomId}`);
    });
  });

  // WebRTC signaling
  socket.on("offer", (roomId, offer) => {
    socket.to(roomId).emit("offer", offer);
  });

  socket.on("answer", (roomId, answer) => {
    socket.to(roomId).emit("answer", answer);
  });

  socket.on("ice-candidate", (roomId, candidate) => {
    socket.to(roomId).emit("ice-candidate", candidate);
  });

  // Chat messages
  socket.on("chat-message", (roomId, message) => {
    io.to(roomId).emit("chat-message", message);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket server ready`);
});
