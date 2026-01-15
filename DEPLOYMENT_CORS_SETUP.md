# 🚀 Deployment CORS Setup Guide

## Overview
This guide explains how to configure CORS for production deployment when your frontend and backend are on different domains.

## 📋 Prerequisites
- Backend deployed on Render/Railway/Heroku
- Frontend deployed on Vercel/Netlify/Render
- MongoDB Atlas database

---

## 🔧 Backend CORS Configuration

### Step 1: Update Environment Variables on Render

Go to your **Render Dashboard** → **Backend Service** → **Environment**

Add/Update these variables:

```env
NODE_ENV=production
FRONTEND_URL=https://your-frontend-app.onrender.com
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/skillswap
JWT_SECRET=<your-strong-secret>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-name>
CLOUDINARY_API_KEY=<your-cloudinary-key>
CLOUDINARY_API_SECRET=<your-cloudinary-secret>
```

### Step 2: Multiple Frontend URLs (Optional)

If you have multiple frontend deployments (staging, production, preview):

```env
FRONTEND_URL=https://skillswap.onrender.com
ALLOWED_ORIGINS=https://skillswap-staging.onrender.com,https://preview-123.onrender.com
```

### Step 3: Verify CORS Configuration

The backend automatically handles CORS based on `FRONTEND_URL`. Check `backend/config/cors.js`:

```javascript
// Automatically allows:
// - localhost:5173 (development)
// - localhost:5174 (development)
// - FRONTEND_URL (production)
// - ALLOWED_ORIGINS (additional URLs)
```

---

## 🎨 Frontend Configuration

### Step 1: Update Frontend Environment Variables

Go to your **Vercel/Netlify Dashboard** → **Environment Variables**

```env
VITE_API_URL=https://your-backend-app.onrender.com/api
```

### Step 2: Verify API Configuration

Check `frontend/src/services/api.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
```

---

## ✅ Testing CORS Setup

### 1. Test Backend Health
```bash
curl https://your-backend.onrender.com/api/health
```

### 2. Test CORS from Frontend
Open browser console on your frontend:

```javascript
fetch('https://your-backend.onrender.com/api/skills')
  .then(res => res.json())
  .then(data => console.log('CORS working!', data))
  .catch(err => console.error('CORS error:', err));
```

### 3. Check Network Tab
- Open DevTools → Network
- Look for CORS errors (red text)
- Check response headers for `Access-Control-Allow-Origin`

---

## 🐛 Common CORS Issues & Fixes

### Issue 1: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Cause**: `FRONTEND_URL` not set correctly in backend

**Fix**:
```env
# Backend .env on Render
FRONTEND_URL=https://your-exact-frontend-url.com
```

### Issue 2: "CORS policy: The value of the 'Access-Control-Allow-Origin' header must not be the wildcard '*'"

**Cause**: Using `FRONTEND_URL=*` in production

**Fix**:
```env
# Use specific URL, not wildcard
FRONTEND_URL=https://skillswap-frontend.onrender.com
```

### Issue 3: Socket.IO connection fails

**Cause**: Socket.IO CORS not configured

**Fix**: Already handled in `backend/server.js`:
```javascript
const io = new Server(server, {
  cors: socketCorsOptions // Automatically uses FRONTEND_URL
});
```

### Issue 4: Credentials not included

**Cause**: Frontend not sending credentials

**Fix**: Already configured in `frontend/src/services/api.js`:
```javascript
axios.defaults.withCredentials = true;
```

---

## 📝 Deployment Checklist

### Backend (Render)
- [ ] Set `NODE_ENV=production`
- [ ] Set `FRONTEND_URL` to deployed frontend URL
- [ ] Set strong `JWT_SECRET`
- [ ] Verify MongoDB Atlas connection
- [ ] Set Cloudinary credentials
- [ ] Deploy and check logs

### Frontend (Vercel/Netlify)
- [ ] Set `VITE_API_URL` to deployed backend URL
- [ ] Build and deploy
- [ ] Test API calls from browser console
- [ ] Verify Socket.IO connection

### Testing
- [ ] Login/Register works
- [ ] API calls succeed
- [ ] No CORS errors in console
- [ ] Socket.IO connects
- [ ] File uploads work

---

## 🔍 Debugging CORS

### Enable CORS Logging

In `backend/config/cors.js`, the configuration already logs blocked origins:

```javascript
console.warn(`CORS blocked origin: ${origin}`);
```

Check your Render logs for these warnings.

### Test with curl

```bash
# Test preflight request
curl -X OPTIONS https://your-backend.onrender.com/api/skills \
  -H "Origin: https://your-frontend.onrender.com" \
  -H "Access-Control-Request-Method: GET" \
  -v

# Should return:
# Access-Control-Allow-Origin: https://your-frontend.onrender.com
# Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
```

---

## 🎯 Quick Reference

### Development URLs
```
Frontend: http://localhost:5173
Backend:  http://localhost:5000
```

### Production URLs (Example)
```
Frontend: https://skillswap-frontend.onrender.com
Backend:  https://skillswap-backend.onrender.com
```

### Environment Variables Summary

| Variable | Backend | Frontend |
|----------|---------|----------|
| `NODE_ENV` | `production` | - |
| `FRONTEND_URL` | Frontend URL | - |
| `VITE_API_URL` | - | Backend URL + `/api` |
| `PORT` | `5000` | - |
| `MONGO_URI` | MongoDB Atlas | - |
| `JWT_SECRET` | Strong secret | - |

---

## 📞 Support

If CORS issues persist:

1. Check Render logs: `Dashboard → Logs`
2. Check browser console for specific error
3. Verify environment variables are saved
4. Redeploy both frontend and backend
5. Clear browser cache and try again

---

**Last Updated**: January 2026
