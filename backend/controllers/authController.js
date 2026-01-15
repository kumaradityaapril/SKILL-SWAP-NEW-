import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Function to validate email format
const isValidEmail = (email) => {
  return emailRegex.test(email);
};

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({ 
      message: "Please provide a valid email address" 
    });
  }

  const userExists = await User.findOne({ email: email.toLowerCase() });
  if (userExists) {
    return res.status(400).json({ message: "User already exists with this email" });
  }

  // Validate password strength
  if (password.length < 6) {
    return res.status(400).json({ 
      message: "Password must be at least 6 characters long" 
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    role,
  });

  res.status(201).json({ 
    message: "User registered successfully",
    email: user.email 
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({ 
      message: "Please provide a valid email address" 
    });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
};
