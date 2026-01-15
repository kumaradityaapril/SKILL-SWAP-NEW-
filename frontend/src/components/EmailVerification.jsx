import { useState, useEffect } from "react";
import api from "../services/api";

const EmailVerification = ({ email, onVerified, onCancel }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/email-verification/verify-otp", {
        email,
        otp: otp.trim(),
      });

      setSuccess(true);
      setTimeout(() => {
        onVerified();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError("");

    try {
      await api.post("/email-verification/resend-otp", { email });
      setTimer(60);
      setCanResend(false);
      alert("New verification code sent!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend code");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scaleIn">
        {success ? (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Email Verified!</h3>
            <p className="text-gray-600">Completing your registration...</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h3>
              <p className="text-gray-600 text-sm">
                We've sent a 6-digit code to
              </p>
              <p className="text-indigo-600 font-semibold">{email}</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Enter Verification Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000"
                  maxLength={6}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center text-2xl font-mono tracking-widest"
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Code expires in 10 minutes
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition"
              >
                {loading ? "Verifying..." : "Verify Email"}
              </button>
            </form>

            <div className="mt-6 text-center">
              {canResend ? (
                <button
                  onClick={handleResend}
                  disabled={resending}
                  className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm disabled:text-gray-400"
                >
                  {resending ? "Sending..." : "Resend Code"}
                </button>
              ) : (
                <p className="text-gray-500 text-sm">
                  Resend code in {timer}s
                </p>
              )}
            </div>

            <button
              onClick={onCancel}
              className="w-full mt-4 text-gray-600 hover:text-gray-800 font-medium text-sm"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
