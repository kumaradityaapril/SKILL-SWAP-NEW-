# 🚀 Deployment Guide

## CORS Configuration

The app now has production-ready CORS configuration for secure deployment.

## 📋 Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database
MONGO_URI=your_mongodb_connection_string

# Security
JWT_SECRET=your_strong_jwt_secret_here

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL (IMPORTANT for CORS)
FRONTEND_URL=https://your-frontend-domain.com

# Multiple Origins (optional, comma-separated)
ALLOWED_ORIGINS=https://your-app.vercel.app,https://your-app.netlify.app
```

### Frontend (.env)

```env
VITE_API_URL=https://your-backend-domain.com/api
```

## 🌐 Deployment Platforms

### Backend Deployment Options:

#### 1. **Render** (Recommended)
- Free tier available
- Easy deployment from GitHub
- Automatic HTTPS
- Environment variables support

**Steps:**
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect your repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables
7. Deploy!

#### 2. **Railway**
- Similar to Render
- Good free tier
- Easy setup

#### 3. **Heroku**
- Popular choice
- Paid plans only now

#### 4. **DigitalOcean App Platform**
- Reliable and scalable
- Good for production

### Frontend Deployment Options:

#### 1. **Vercel** (Recommended for React)
- Free tier
- Automatic deployments from GitHub
- Built-in CDN
- Perfect for Vite/React apps

**Steps:**
1. Push code to GitHub
2. Import project on Vercel
3. Set root directory to `frontend`
4. Add environment variable: `VITE_API_URL`
5. Deploy!

#### 2. **Netlify**
- Similar to Vercel
- Great for static sites
- Easy setup

#### 3. **Cloudflare Pages**
- Fast CDN
- Free tier

## 🔧 Pre-Deployment Checklist

### Backend:
- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET`
- [ ] Update `FRONTEND_URL` to production URL
- [ ] Add production domains to `ALLOWED_ORIGINS`
- [ ] Ensure MongoDB connection string is correct
- [ ] Test all API endpoints

### Frontend:
- [ ] Update `VITE_API_URL` to production backend URL
- [ ] Test build locally: `npm run build`
- [ ] Check for console errors
- [ ] Test authentication flow
- [ ] Verify image uploads work

## 🔒 Security Best Practices

1. **Never commit .env files** - Already in .gitignore
2. **Use strong JWT secrets** - Generate with: `openssl rand -base64 32`
3. **Enable HTTPS** - Most platforms provide this automatically
4. **Whitelist specific origins** - Don't use `*` in production
5. **Keep dependencies updated** - Run `npm audit` regularly

## 📝 CORS Configuration Details

### How It Works:

1. **Development Mode:**
   - Allows all origins for easy testing
   - Localhost ports 5173 and 5174 whitelisted

2. **Production Mode:**
   - Only allows origins from `FRONTEND_URL` and `ALLOWED_ORIGINS`
   - Blocks unauthorized domains
   - Logs blocked attempts

### Adding New Origins:

**Option 1: Single Origin**
```env
FRONTEND_URL=https://your-app.vercel.app
```

**Option 2: Multiple Origins**
```env
FRONTEND_URL=https://your-app.vercel.app
ALLOWED_ORIGINS=https://your-app.netlify.app,https://custom-domain.com
```

## 🧪 Testing Deployment

### Test Backend:
```bash
curl https://your-backend-domain.com/api/skills
```

### Test CORS:
```bash
curl -H "Origin: https://your-frontend-domain.com" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://your-backend-domain.com/api/auth/login
```

Should return CORS headers if configured correctly.

## 🐛 Common Issues

### Issue: CORS Error in Production
**Solution:** 
- Verify `FRONTEND_URL` matches exactly (no trailing slash)
- Check `ALLOWED_ORIGINS` includes all domains
- Ensure `NODE_ENV=production` is set

### Issue: WebSocket Connection Failed
**Solution:**
- Ensure backend supports WebSocket (most platforms do)
- Check if platform requires specific configuration
- Verify Socket.IO CORS settings

### Issue: Images Not Uploading
**Solution:**
- Verify Cloudinary credentials
- Check file size limits on hosting platform
- Ensure multer middleware is working

## 📊 Monitoring

After deployment, monitor:
- API response times
- Error rates
- Database connections
- Memory usage
- CORS blocked requests (check logs)

## 🔄 CI/CD (Optional)

Set up automatic deployments:
1. Push to `main` branch → Auto-deploy to production
2. Push to `develop` branch → Auto-deploy to staging
3. Pull requests → Preview deployments

Most platforms (Vercel, Netlify, Render) support this out of the box!

## 📞 Support

If you encounter issues:
1. Check platform-specific logs
2. Verify environment variables
3. Test CORS with curl
4. Check browser console for errors
5. Review backend logs for CORS warnings

---

**Ready to deploy?** Follow the steps above and your app will be live in minutes! 🎉
