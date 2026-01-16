# 🚨 URGENT FIX: 404 Error on Login

## 🔴 The Problem
```
POST https://skill-swap-new.onrender.com/auth/login 404 (Not Found)
```

**Root Cause**: Frontend is calling `/auth/login` but backend expects `/api/auth/login`

---

## ✅ THE FIX (3 Steps)

### Step 1: Set Frontend Environment Variable on Render/Vercel/Netlify

**Go to your frontend deployment dashboard** and set:

```env
VITE_API_URL=https://skill-swap-new.onrender.com/api
```

⚠️ **CRITICAL POINTS**:
- ✅ Must include `/api` at the end
- ✅ Must be your backend Render URL
- ✅ No trailing slash after `/api`

#### For Render:
1. Go to Dashboard → Your Frontend Service
2. Click "Environment" tab
3. Add environment variable:
   - Key: `VITE_API_URL`
   - Value: `https://skill-swap-new.onrender.com/api`
4. Click "Save Changes"
5. Render will auto-redeploy

#### For Vercel:
1. Go to Project Settings → Environment Variables
2. Add:
   - Name: `VITE_API_URL`
   - Value: `https://skill-swap-new.onrender.com/api`
3. Redeploy

#### For Netlify:
1. Go to Site Settings → Environment Variables
2. Add:
   - Key: `VITE_API_URL`
   - Value: `https://skill-swap-new.onrender.com/api`
3. Trigger new deploy

---

### Step 2: Verify API Service Configuration

Check `frontend/src/services/api.js` - it should look like this:

```javascript
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// ... rest of the code
export default api;
```

✅ This is already correct in your code!

---

### Step 3: Verify Login Call

Check `frontend/src/pages/Login.jsx` - the login call should be:

```javascript
const res = await api.post("/auth/login", { email, password });
```

✅ This is already correct in your code!

---

## 🔍 How It Works

With `VITE_API_URL=https://skill-swap-new.onrender.com/api`:

```javascript
api.post("/auth/login", data)
```

Becomes:
```
https://skill-swap-new.onrender.com/api/auth/login ✅
```

Without `/api` in `VITE_API_URL`:
```
https://skill-swap-new.onrender.com/auth/login ❌ (404 error)
```

---

## 🧪 Test After Deployment

### 1. Check Environment Variable
Open browser console on your deployed frontend:
```javascript
console.log(import.meta.env.VITE_API_URL);
// Should output: https://skill-swap-new.onrender.com/api
```

### 2. Test API Endpoint
```javascript
fetch('https://skill-swap-new.onrender.com/api/skills')
  .then(res => res.json())
  .then(data => console.log('API working!', data))
  .catch(err => console.error('Error:', err));
```

### 3. Test Login
- Go to login page
- Open Network tab in DevTools
- Try to login
- Check the request URL should be:
  ```
  https://skill-swap-new.onrender.com/api/auth/login
  ```

---

## 📋 Complete Environment Variables

### Backend (Render):
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

### Frontend (Render/Vercel/Netlify):
```env
VITE_API_URL=https://skill-swap-new.onrender.com/api
```

---

## ⚠️ Common Mistakes

### ❌ WRONG:
```env
VITE_API_URL=https://skill-swap-new.onrender.com
VITE_API_URL=https://skill-swap-new.onrender.com/api/
VITE_API_URL=https://skill-swap-new.onrender.com/api/auth
```

### ✅ CORRECT:
```env
VITE_API_URL=https://skill-swap-new.onrender.com/api
```

---

## 🎯 Quick Checklist

- [ ] Set `VITE_API_URL` in frontend deployment platform
- [ ] Value ends with `/api` (no trailing slash)
- [ ] Redeploy frontend
- [ ] Test in browser console: `console.log(import.meta.env.VITE_API_URL)`
- [ ] Try login and check Network tab
- [ ] Verify request goes to `/api/auth/login`

---

**After setting the environment variable, your frontend will automatically use the correct API URL and the 404 error will be fixed!** ✅
