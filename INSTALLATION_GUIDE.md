# Video Chat & Session Booking Feature - Installation Guide

## Backend Dependencies

Run these commands in the `backend` folder:

```bash
cd backend
npm install socket.io uuid nodemailer
```

## Frontend Dependencies

Run these commands in the `frontend` folder:

```bash
cd frontend
npm install socket.io-client simple-peer
```

## Email Configuration

1. Open `backend/.env`
2. Update the email settings:
   - For Gmail: Enable "App Passwords" in your Google Account settings
   - Replace `EMAIL_USER` with your email
   - Replace `EMAIL_PASSWORD` with your app password

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
FRONTEND_URL=http://localhost:5173
```

## Features Included

### Backend:
- ✅ Session model for booking management
- ✅ WebSocket server for real-time video chat
- ✅ Email notifications (booking confirmation & reminders)
- ✅ Session CRUD operations
- ✅ WebRTC signaling support

### Frontend:
- ✅ Session booking modal
- ✅ Video chat room with WebRTC
- ✅ Session management pages
- ✅ Real-time chat during sessions
- ✅ Beautiful UI with Tailwind CSS

## How It Works

1. **Learner requests a skill** → Mentor accepts
2. **Either party books a session** → Selects date/time
3. **Email sent to both** → With meeting link
4. **At scheduled time** → Both join video room
5. **WebRTC connection** → Peer-to-peer video chat
6. **Session completed** → Status updated

## Testing

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Create two accounts (mentor & learner)
4. Request a skill → Accept → Book session
5. Join the video room using the provided link
