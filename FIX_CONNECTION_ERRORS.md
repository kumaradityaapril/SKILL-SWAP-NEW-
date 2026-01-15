# 🔧 Fix Connection Errors - Quick Guide

## Current Error: ERR_CONNECTION_REFUSED

This means the **backend server is not running**.

## ✅ Quick Fix (3 Steps):

### 1. Install New Packages

**Backend Terminal:**
```bash
cd SKILL-SWAP-NEW-/backend
npm install socket.io uuid nodemailer
```

**Frontend Terminal:**
```bash
cd SKILL-SWAP-NEW-/frontend
npm install socket.io-client simple-peer
```

### 2. Start Backend Server

```bash
cd SKILL-SWAP-NEW-/backend
npm run dev
```

**Expected Output:**
```
Server running on port 5000
WebSocket server ready
MongoDB connected
```

### 3. Refresh Frontend

The frontend should already be running. Just refresh the browser (F5).

## ✅ Verification

After starting the backend, you should see:
- ✅ No more connection errors in console
- ✅ Skills page loads successfully
- ✅ You can browse and create skills

## 📝 Common Issues

### "Cannot find module 'socket.io'"
**Solution:** Run `npm install socket.io uuid nodemailer` in backend folder

### "Cannot find module 'socket.io-client'"
**Solution:** Run `npm install socket.io-client simple-peer` in frontend folder

### "Port 5000 already in use"
**Solution:** 
- Kill the process using port 5000
- Or change PORT in backend/.env to 5001

### MongoDB connection error
**Solution:**
- Check MONGO_URI in backend/.env
- Make sure MongoDB is accessible
- Verify network connection

## 🎯 What's New

After fixing the connection, you'll have access to:
- 📹 **Video Chat Sessions** - WebRTC peer-to-peer video
- 📧 **Email Notifications** - Automatic booking confirmations
- 📅 **Session Booking** - Schedule learning sessions
- 💬 **Real-time Chat** - Text chat during video sessions

## 🚀 Next Steps

1. Fix the connection (follow steps above)
2. Test the existing features (login, create skills, etc.)
3. Then we can add the session booking UI
4. Test the video chat feature

---

**Need Help?** Check STARTUP_GUIDE.md for detailed instructions.
