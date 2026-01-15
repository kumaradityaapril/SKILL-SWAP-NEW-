# 🔧 Quick Fix Checklist - Email Verification Setup

## Current Error: 500 Internal Server Error

The error you're seeing is because the backend needs to be set up properly. Follow these steps:

## ✅ Step-by-Step Fix:

### 1. Install Required Package
Open terminal in `backend` folder:
```bash
cd backend
npm install nodemailer
```

### 2. Verify .env Configuration
Make sure `backend/.env` has these lines:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:5173
```

### 3. Restart Backend Server
Stop the current backend server (Ctrl+C) and restart:
```bash
cd backend
npm run dev
```

You should see:
```
Server running on port 5000
WebSocket server ready
MongoDB connected
```

### 4. Test Registration
1. Go to http://localhost:5173/register
2. Fill in the form
3. Click "Send Verification Code"
4. Check your email for the OTP
5. Enter the code
6. Complete registration

## 🐛 If Still Getting Errors:

### Check Backend Console
Look for specific error messages in the backend terminal. Common issues:

**Error: "Cannot find module 'nodemailer'"**
- Solution: Run `npm install nodemailer` in backend folder

**Error: "Invalid login"** or **"Authentication failed"**
- Solution: Check EMAIL_USER and EMAIL_PASSWORD in .env
- Make sure you're using Gmail App Password, not regular password

**Error: "EmailVerification is not defined"**
- Solution: Restart backend server

### Check Frontend Console
If you see CORS errors:
- Make sure backend is running on port 5000
- Check that frontend is running on port 5173

## 📝 Quick Test Without Email

If you want to test without setting up email first, you can temporarily disable email verification:

### Option 1: Skip Verification (Testing Only)
Comment out the verification check in `backend/controllers/authController.js`:

```javascript
// Temporarily comment these lines for testing:
/*
const verification = await EmailVerification.findOne({
  email: email.toLowerCase(),
  verified: true,
});

if (!verification) {
  return res.status(400).json({
    message: "Please verify your email first",
    requiresVerification: true,
  });
}
*/
```

### Option 2: Use Old Registration
Temporarily use the old Register.jsx without OTP (backup the new one first)

## ✅ Verification Checklist:

- [ ] nodemailer installed (`npm install nodemailer`)
- [ ] .env file configured with EMAIL_USER and EMAIL_PASSWORD
- [ ] Backend server restarted
- [ ] Backend running without errors
- [ ] Frontend running without errors
- [ ] Can access registration page
- [ ] Can click "Send Verification Code"
- [ ] Email received (check spam folder)
- [ ] Can enter OTP and verify

## 🎯 Expected Behavior:

1. **Fill registration form** → Click "Send Verification Code"
2. **Modal appears** → "Verify Your Email"
3. **Check email** → Receive 6-digit code
4. **Enter code** → Click "Verify Email"
5. **Success** → "Email Verified!" → Auto-login → Dashboard

## 📧 Gmail App Password Setup:

If you haven't set up Gmail App Password yet:

1. Go to https://myaccount.google.com/security
2. Enable "2-Step Verification"
3. Search for "App passwords"
4. Select "Mail" and "Other (Custom name)"
5. Copy the 16-character password
6. Paste in `EMAIL_PASSWORD` in .env
7. Restart backend server

## 🚨 Common Mistakes:

❌ Using regular Gmail password instead of App Password
❌ Not restarting backend after installing nodemailer
❌ Typo in .env file (EMAIL_USER or EMAIL_PASSWORD)
❌ Backend not running
❌ Wrong port numbers

## ✅ Success Indicators:

When everything is working:
- Backend console shows "Server running on port 5000"
- No errors in backend console
- Registration page loads
- "Send Verification Code" button works
- Email arrives within seconds
- OTP verification succeeds
- User is registered and logged in

---

**Need Help?** Check the backend console for specific error messages!
