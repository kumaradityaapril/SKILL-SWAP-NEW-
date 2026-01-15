import express from "express";
import {
  sendVerificationOTP,
  verifyOTP,
  resendOTP,
} from "../controllers/emailVerificationController.js";

const router = express.Router();

// Send OTP to email
router.post("/send-otp", sendVerificationOTP);

// Verify OTP
router.post("/verify-otp", verifyOTP);

// Resend OTP
router.post("/resend-otp", resendOTP);

export default router;
