/**
 * CORS Configuration for Production Deployment
 * 
 * This file manages Cross-Origin Resource Sharing settings
 * for both Express and Socket.IO
 */

// Get allowed origins from environment or use defaults
const getAllowedOrigins = () => {
  const origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    process.env.FRONTEND_URL,
  ];

  // Add additional origins from environment variable if provided
  if (process.env.ALLOWED_ORIGINS) {
    const additionalOrigins = process.env.ALLOWED_ORIGINS.split(",").map(
      (origin) => origin.trim()
    );
    origins.push(...additionalOrigins);
  }

  // Remove undefined/null values
  return origins.filter(Boolean);
};

// Express CORS options
export const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = getAllowedOrigins();

    // Allow requests with no origin (mobile apps, Postman, curl)
    if (!origin) return callback(null, true);

    // In development, allow all origins
    if (process.env.NODE_ENV === "development") {
      return callback(null, true);
    }

    // Check if origin is in allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies and authorization headers
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 86400, // Cache preflight requests for 24 hours
};

// Socket.IO CORS options
export const socketCorsOptions = {
  origin: getAllowedOrigins(),
  methods: ["GET", "POST"],
  credentials: true,
  transports: ["websocket", "polling"], // Support both for better compatibility
};

export default { corsOptions, socketCorsOptions };
