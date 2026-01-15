# 📦 Git Setup & Environment Variables

## ✅ What Gets Pushed to GitHub

### ✅ SAFE to Push (No Secrets):
- `backend/.env.example` - Template with placeholder values
- `frontend/.env.example` - Template with placeholder values
- All source code files
- Documentation files
- Configuration files (without secrets)

### ❌ NEVER Push (Contains Secrets):
- `backend/.env` - Contains real credentials
- `frontend/.env` - Contains real API URLs
- `frontend/.env.local` - Local overrides
- `node_modules/` - Dependencies (too large)
- `dist/` - Build output

## 🔒 .gitignore Configuration

### Backend (.gitignore)
```gitignore
# Environment variables (contains secrets)
.env
.env.local
.env.*.local

# BUT allow .env.example (template without secrets)
!.env.example

# Dependencies
node_modules

# Logs
logs
*.log
```

### Frontend (.gitignore)
```gitignore
# Environment variables (contains secrets)
.env
.env.local
.env.*.local

# BUT allow .env.example (template without secrets)
!.env.example

# Dependencies
node_modules

# Build output
dist
dist-ssr
```

## 🚀 Setup for New Developers

When someone clones your repository, they should:

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/skillswap.git
cd skillswap
```

### 2. Setup Backend
```bash
cd backend
cp .env.example .env
# Edit .env with real credentials
npm install
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
cp .env.example .env
# Edit .env with real API URL
npm install
npm run dev
```

## 📝 Environment Variable Templates

### Backend `.env.example`
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_strong_jwt_secret_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
```

### Frontend `.env.example`
```env
VITE_API_URL=http://localhost:5000/api
```

## 🔍 Verify Git Ignore

Check what will be ignored:
```bash
# From SKILL-SWAP-NEW- directory
git check-ignore backend/.env backend/.env.example frontend/.env frontend/.env.example
```

Expected output:
```
backend/.env          ← Ignored (good!)
frontend/.env         ← Ignored (good!)
```

`.env.example` files should NOT appear (they will be tracked).

## ⚠️ Security Best Practices

1. **Never commit .env files**
   - Already configured in .gitignore ✅
   
2. **Use strong secrets in production**
   - Generate JWT secret: `openssl rand -base64 32`
   
3. **Rotate secrets if exposed**
   - If you accidentally commit .env, rotate all secrets immediately
   
4. **Use environment variables on hosting platforms**
   - Don't hardcode secrets in code
   
5. **Keep .env.example updated**
   - When adding new variables, update .env.example too

## 🔄 Git Workflow

### Initial Setup
```bash
cd SKILL-SWAP-NEW-
git init
git add .
git commit -m "Initial commit with CORS and notification system"
git branch -M main
git remote add origin https://github.com/yourusername/skillswap.git
git push -u origin main
```

### Regular Updates
```bash
git add .
git commit -m "Your commit message"
git push
```

### Check Status
```bash
git status
# Should NOT show .env files
```

## 📋 Pre-Commit Checklist

Before committing:
- [ ] No .env files in staging area
- [ ] .env.example is updated if you added new variables
- [ ] No API keys or secrets in code
- [ ] No console.log with sensitive data
- [ ] All tests pass
- [ ] Code is formatted

## 🆘 Accidentally Committed .env?

If you accidentally committed .env:

### 1. Remove from Git (keep local file)
```bash
git rm --cached backend/.env
git rm --cached frontend/.env
git commit -m "Remove .env files from tracking"
git push
```

### 2. Rotate ALL Secrets
- Change MongoDB password
- Generate new JWT secret
- Regenerate Cloudinary API keys
- Update all environment variables

### 3. Update .gitignore
Already done! ✅

## 📚 Resources

- [Git Ignore Patterns](https://git-scm.com/docs/gitignore)
- [Environment Variables Best Practices](https://12factor.net/config)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)

---

**Your .gitignore is properly configured!** `.env.example` files will be pushed to help other developers set up the project. 🎉
