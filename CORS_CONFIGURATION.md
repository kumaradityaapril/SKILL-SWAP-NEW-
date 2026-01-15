# 🔒 CORS Configuration Reference

## What is CORS?

Cross-Origin Resource Sharing (CORS) is a security feature that controls which domains can access your API. Without proper CORS configuration, browsers will block requests from your frontend to your backend.

## ✅ What's Configured

### 1. **Express CORS** (`backend/app.js`)
- Handles HTTP requests (GET, POST, PUT, PATCH, DELETE)
- Validates origin against whitelist
- Supports credentials (cookies, auth headers)
- Caches preflight requests for 24 hours

### 2. **Socket.IO CORS** (`backend/server.js`)
- Handles WebSocket connections for video chat
- Same origin validation as Express
- Supports both WebSocket and polling transports

### 3. **Centralized Config** (`backend/config/cors.js`)
- Single source of truth for CORS settings
- Easy to update for deployment
- Supports multiple origins

## 🎯 How It Works

### Development Mode (`NODE_ENV=development`)
```
✅ Allows ALL origins
✅ Perfect for local testing
✅ No configuration needed
```

### Production Mode (`NODE_ENV=production`)
```
✅ Only allows whitelisted origins
✅ Blocks unauthorized domains
✅ Logs blocked attempts
```

## 🔧 Configuration

### Single Frontend Domain
```env
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

### Multiple Frontend Domains
```env
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
ALLOWED_ORIGINS=https://your-app.netlify.app,https://custom-domain.com
```

### Development
```env
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 📋 Allowed Methods

- `GET` - Fetch data
- `POST` - Create resources
- `PUT` - Update entire resource
- `PATCH` - Update partial resource
- `DELETE` - Remove resource
- `OPTIONS` - Preflight requests

## 🔑 Allowed Headers

- `Content-Type` - JSON, form data, etc.
- `Authorization` - JWT tokens
- `X-Requested-With` - AJAX requests

## 🚀 Deployment Steps

### Step 1: Deploy Backend
1. Set `NODE_ENV=production`
2. Deploy to Render/Railway/Heroku
3. Note the backend URL (e.g., `https://api.yourapp.com`)

### Step 2: Deploy Frontend
1. Set `VITE_API_URL=https://api.yourapp.com/api`
2. Deploy to Vercel/Netlify
3. Note the frontend URL (e.g., `https://yourapp.vercel.app`)

### Step 3: Update Backend CORS
1. Update backend environment variables:
   ```env
   FRONTEND_URL=https://yourapp.vercel.app
   ```
2. Restart backend server
3. Test the connection

## 🧪 Testing CORS

### Test 1: Check if CORS headers are present
```bash
curl -I https://your-backend.com/api/skills
```

Look for:
```
Access-Control-Allow-Origin: https://your-frontend.com
Access-Control-Allow-Credentials: true
```

### Test 2: Test preflight request
```bash
curl -X OPTIONS https://your-backend.com/api/auth/login \
  -H "Origin: https://your-frontend.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type"
```

Should return 200 OK with CORS headers.

### Test 3: Test from browser
Open browser console on your frontend:
```javascript
fetch('https://your-backend.com/api/skills')
  .then(res => res.json())
  .then(data => console.log('Success:', data))
  .catch(err => console.error('CORS Error:', err));
```

## ❌ Common Errors

### Error: "No 'Access-Control-Allow-Origin' header"
**Cause:** Origin not in whitelist
**Fix:** Add your frontend URL to `FRONTEND_URL` or `ALLOWED_ORIGINS`

### Error: "CORS policy: credentials mode is 'include'"
**Cause:** Backend not configured for credentials
**Fix:** Already configured! Check if `withCredentials: true` is set in frontend

### Error: "Method not allowed by CORS"
**Cause:** HTTP method not in allowed list
**Fix:** Already configured! All standard methods are allowed

### Error: WebSocket connection failed
**Cause:** Socket.IO CORS not configured
**Fix:** Already configured! Check if frontend URL is correct

## 🔍 Debugging

### Check Backend Logs
Look for:
```
CORS blocked origin: https://unauthorized-domain.com
```

### Check Browser Console
Look for:
```
Access to fetch at 'https://api.com' from origin 'https://app.com' 
has been blocked by CORS policy
```

### Verify Environment Variables
```bash
# Backend
echo $NODE_ENV
echo $FRONTEND_URL
echo $ALLOWED_ORIGINS

# Frontend
echo $VITE_API_URL
```

## 📝 Best Practices

1. ✅ **Never use `*` in production** - Always whitelist specific domains
2. ✅ **Use HTTPS in production** - Required for secure cookies
3. ✅ **Keep origins list minimal** - Only add domains you control
4. ✅ **Test after deployment** - Verify CORS works before going live
5. ✅ **Monitor blocked requests** - Check logs for unauthorized access attempts

## 🎓 Learn More

- [MDN CORS Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Express CORS Package](https://www.npmjs.com/package/cors)
- [Socket.IO CORS Docs](https://socket.io/docs/v4/handling-cors/)

---

**Your app is now production-ready with secure CORS configuration!** 🎉
