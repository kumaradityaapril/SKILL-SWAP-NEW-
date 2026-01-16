# 🚀 Production Deployment Steps

## ✅ Issue Fixed: API URL Configuration

### The Problem
Frontend was calling: `POST /auth/login` (404 error)  
Backend expects: `POST /api/auth/login`

### The Solution
Frontend must use `VITE_API_URL` that **ends with `/api`**

---

## 📋 Deployment Checklist

### 1️⃣ Backend Deployment (Render)

#### Environment Variables to Set:
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://aditya:1204@skillswap.lunmr46.mongodb.net/
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=dhdzoeoia
CLOUDINARY_API_KEY=325848541758195
CLOUDINARY_API_SECRET=RUgBjcavJVCBP7SBQ3oJMC0-6UQ
FRONTEND_URL=https://your-frontend-app.onrender.com
```

#### Important Notes:
- ✅ Node version is pinned to 20.x (see `.nvmrc` and `package.json`)
- ✅ MongoDB and Mongoose versions are locked for compatibility
- ✅ CORS is configured to accept `FRONTEND_URL`

#### Deploy Command:
```bash
npm install
npm start
```

---

### 2️⃣ Frontend Deployment (Vercel/Netlify/Render)

#### Environment Variables to Set:
```env
VITE_API_URL=https://skill-swap-new.onrender.com/api
```

⚠️ **CRITICAL**: The URL **MUST end with `/api`**

#### Build Command:
```bash
npm install
npm run build
```

#### Output Directory:
```
dist
```

---

## 🔍 Verification Steps

### After Backend Deployment:

1. **Test Health Endpoint**:
```bash
curl https://skill-swap-new.onrender.com/api/auth/login
```
Should return: Method not allowed or similar (not 404)

2. **Check Logs**:
- Look for "MongoDB connected"
- Look for "Server running on port 5000"

### After Frontend Deployment:

1. **Check Environment Variables**:
Open browser console and run:
```javascript
console.log(import.meta.env.VITE_API_URL);
```
Should output: `https://skill-swap-new.onrender.com/api`

2. **Test API Call**:
```javascript
fetch('https://skill-swap-new.onrender.com/api/skills')
  .then(res => res.json())
  .then(data => console.log('API working!', data))
  .catch(err => console.error('API error:', err));
```

3. **Test Login**:
- Go to login page
- Open Network tab in DevTools
- Try to login
- Check the request URL - should be: `https://skill-swap-new.onrender.com/api/auth/login`

---

## 🐛 Common Issues & Fixes

### Issue 1: 404 on /auth/login

**Cause**: `VITE_API_URL` doesn't end with `/api`

**Fix**:
```env
# ❌ WRONG
VITE_API_URL=https://skill-swap-new.onrender.com

# ✅ CORRECT
VITE_API_URL=https://skill-swap-new.onrender.com/api
```

### Issue 2: CORS Error

**Cause**: Backend `FRONTEND_URL` doesn't match actual frontend URL

**Fix**:
```env
# Backend .env on Render
FRONTEND_URL=https://your-exact-frontend-url.onrender.com
```

### Issue 3: MongoDB Connection Failed

**Cause**: MongoDB URI not set or incorrect

**Fix**:
- Verify MongoDB Atlas connection string
- Check IP whitelist (allow all: 0.0.0.0/0)
- Ensure database user has correct permissions

### Issue 4: Environment Variables Not Working

**Cause**: Vite doesn't hot-reload env vars

**Fix**:
```bash
# Rebuild the frontend
npm run build

# Or restart dev server
npm run dev
```

---

## 📝 API Endpoint Structure

### Backend Routes (in `app.js`):
```javascript
app.use("/api/auth", authRoutes);      // → /api/auth/login, /api/auth/register
app.use("/api/skills", skillRoutes);   // → /api/skills, /api/skills/:id
app.use("/api/requests", requestRoutes); // → /api/requests
app.use("/api/sessions", sessionRoutes); // → /api/sessions
```

### Frontend API Calls (in components):
```javascript
// ✅ CORRECT - baseURL already has /api
api.post("/auth/login", data);        // → /api/auth/login
api.get("/skills");                   // → /api/skills
api.post("/requests", data);          // → /api/requests

// ❌ WRONG - Don't include /api in the path
api.post("/api/auth/login", data);    // → /api/api/auth/login (404)
```

---

## 🎯 Quick Reference

### Local Development:
```env
# Backend .env
FRONTEND_URL=http://localhost:5173

# Frontend .env
VITE_API_URL=http://localhost:5000/api
```

### Production:
```env
# Backend (Render)
FRONTEND_URL=https://skillswap-frontend.onrender.com

# Frontend (Vercel/Netlify)
VITE_API_URL=https://skillswap-backend.onrender.com/api
```

---

## ✅ Final Checklist Before Going Live

- [ ] Backend deployed on Render
- [ ] Backend environment variables set
- [ ] Backend logs show "MongoDB connected"
- [ ] Frontend deployed on Vercel/Netlify/Render
- [ ] Frontend `VITE_API_URL` ends with `/api`
- [ ] Backend `FRONTEND_URL` matches frontend URL
- [ ] Test login from production frontend
- [ ] Test registration from production frontend
- [ ] Test skill browsing
- [ ] Test video session creation
- [ ] No CORS errors in browser console
- [ ] No 404 errors on API calls

---

**Last Updated**: January 2026  
**Status**: ✅ API URL Configuration Fixed
