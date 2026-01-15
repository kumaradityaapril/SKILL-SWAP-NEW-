import EmailVerification from "../models/EmailVerification.js";
import User from "../models/User.js";
import { generateOTP, sendOTPEmail } from "../config/otpEmail.js";

// Send OTP to email
export const sendVerificationOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if email already registered
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Generate OTP
    const otp = generateOTP();

    // Delete any existing OTP for this email
    await EmailVerification.deleteMany({ email: email.toLowerCase() });

    // Save new OTP
    await EmailVerification.create({
      email: email.toLowerCase(),
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });

    // Send OTP email
    await sendOTPEmail(email, otp);

    res.json({
      message: "Verification code sent to your email",
      email: email.toLowerCase(),
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({
      message: error.message || "Failed to send verification code",
    });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    // Find verification record
    const verification = await EmailVerification.findOne({
      email: email.toLowerCase(),
      otp: otp.trim(),
    });

    if (!verification) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    // Check if expired
    if (new Date() > verification.expiresAt) {
      await EmailVerification.deleteOne({ _id: verification._id });
      return res.status(400).json({
        message: "Verification code expired. Please request a new one",
      });
    }

    // Mark as verified
    verification.verified = true;
    await verification.save();

    res.json({
      message: "Email verified successfully",
      verified: true,
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: "Verification failed" });
  }
};

// Resend OTP
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if email already registered
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Generate new OTP
    const otp = generateOTP();

    // Delete old OTP
    await EmailVerification.deleteMany({ email: email.toLowerCase() });

    // Save new OTP
    await EmailVerification.create({
      email: email.toLowerCase(),
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    // Send OTP email
    await sendOTPEmail(email, otp);

    res.json({ message: "New verification code sent" });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ message: "Failed to resend verification code" });
  }
};
