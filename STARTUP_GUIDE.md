# 🚀 SkillSwap - Complete Startup Guide

## ⚠️ IMPORTANT: Follow These Steps in Order

### Step 1: Install Backend Dependencies

Open a terminal in the `backend` folder and run:

```bash
cd backend
npm install socket.io uuid nodemailer
```

### Step 2: Install Frontend Dependencies

Open another terminal in the `frontend` folder and run:

```bash
cd frontend
npm install socket.io-client simple-peer
```

### Step 3: Configure Email (Backend)

1. Open `backend/.env`
2. Update these values:

```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

**To get Gmail App Password:**
1. Go to https://myaccount.google.com/security
2. Enable "2-Step Verification"
3. Search for "App passwords"
4. Generate a new app password
5. Copy and paste it into `EMAIL_PASSWORD`

### Step 4: Start Backend Server

In the `backend` terminal:

```bash
npm run dev
```

You should see:
```
Server running on port 5000
WebSocket server ready
MongoDB connected
```

### Step 5: Start Frontend Server

In the `frontend` terminal:

```bash
npm run dev
```

You should see:
```
VITE ready in XXX ms
Local: http://localhost:5173
```

### Step 6: Test the Application

1. Open http://localhost:5173
2. Register as a mentor
3. Create a skill post
4. Register as a learner (different email)
5. Request the skill
6. Accept the request (as mentor)
7. Book a session
8. Check emails for meeting link
9. Join video session

## 🔧 Troubleshooting

### Backend won't start:
- Check if MongoDB is connected
- Verify all dependencies are installed
- Check for syntax errors in console

### Frontend shows connection errors:
- Make sure backend is running on port 5000
- Check `frontend/src/services/api.js` has correct URL
- Clear browser cache and reload

### Email not sending:
- Verify Gmail app password is correct
- Check EMAIL_USER and EMAIL_PASSWORD in .env
- Make sure 2-Step Verification is enabled

### Video chat not working:
- Allow camera/microphone permissions in browser
- Use Chrome or Firefox for best compatibility
- Check if both users are in the same room

## 📁 Project Structure

```
SKILL-SWAP-NEW-/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   ├── email.js          ← NEW
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── skillPostController.js
│   │   ├── requestController.js
│   │   └── sessionController.js  ← NEW
│   ├── models/
│   │   ├── User.js
│   │   ├── SkillPost.js
│   │   ├── Request.js
│   │   └── Session.js        ← NEW
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── skillPostRoutes.js
│   │   ├── requestRoutes.js
│   │   └── sessionRoutes.js  ← NEW
│   ├── app.js               ← UPDATED
│   ├── server.js            ← UPDATED
│   └── .env                 ← UPDATED
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Skills.jsx
    │   │   ├── SkillDetail.jsx
    │   │   ├── CreateSkill.jsx
    │   │   ├── MentorDashboard.jsx
    │   │   ├── LearnerDashboard.jsx
    │   │   ├── MentorRequests.jsx
    │   │   ├── LearnerRequests.jsx
    │   │   └── VideoSession.jsx  ← NEW
    │   ├── App.jsx              ← UPDATED
    │   └── services/
    │       └── api.js
    └── package.json

```

## ✅ Features Checklist

- [x] User Authentication (Login/Register)
- [x] Role-based Dashboards (Mentor/Learner)
- [x] Skill Post Creation
- [x] Skill Browsing & Search
- [x] Request System
- [x] Session Booking
- [x] Email Notifications
- [x] Video Chat (WebRTC)
- [x] Real-time Chat
- [x] Beautiful UI with Tailwind CSS
- [x] Animations

## 🎯 Next Features to Add (Optional)

1. **Session Booking UI** - Add booking modal in requests page
2. **Sessions List** - Show all upcoming/past sessions
3. **Calendar View** - Visual calendar for scheduling
4. **Notifications** - Browser push notifications
5. **Reviews & Ratings** - Rate mentors after sessions
6. **Profile Pages** - User profiles with bio
7. **Search Filters** - Advanced skill filtering
8. **Admin Dashboard** - Manage users and content

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Make sure both servers are running
4. Check the troubleshooting section above

Happy coding! 🎉
