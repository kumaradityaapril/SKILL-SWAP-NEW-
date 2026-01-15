# 🎓 Skill Swap Platform

A modern peer-to-peer learning platform that connects mentors and learners for skill exchange through real-time video sessions. Built with the MERN stack (MongoDB, Express, React, Node.js) and featuring WebRTC-powered video chat.

## ✨ Features

### 👥 User Management
- **Dual Role System**: Users can register as Mentors or Learners
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **Email Verification**: Nodemailer integration for account verification
- **Profile Management**: Upload profile pictures via Cloudinary

### 📚 Skill Marketplace
- **Create Skill Posts**: Mentors can list skills they want to teach
- **Browse Skills**: Learners can explore available skills with search and filters
- **Detailed Skill Pages**: View mentor profiles, skill descriptions, and ratings
- **Image Uploads**: Skill posts support image attachments

### 🤝 Session Management
- **Request System**: Learners send requests to mentors
- **Accept/Reject**: Mentors can manage incoming requests
- **Session Booking**: Schedule 1-on-1 video sessions with date/time selection
- **Session Duration**: Flexible duration options (30 min, 1 hour, 1.5 hours, 2 hours)

### 🎥 Real-Time Video Chat
- **WebRTC Integration**: Peer-to-peer video calls using SimplePeer
- **Socket.io**: Real-time signaling and connection management
- **Video Controls**: Mute/unmute audio, toggle video on/off
- **Text Chat**: In-session messaging alongside video
- **Session Protection**: Prevents rejoining after call ends
- **Auto-redirect**: Returns users to appropriate dashboard after session

### 📊 Dashboards
- **Mentor Dashboard**: View requests, manage sessions, track learners
- **Learner Dashboard**: Browse skills, track requests, manage bookings
- **Session History**: Complete session tracking with status updates

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router v7** - Client-side routing
- **Tailwind CSS v4** - Utility-first styling
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **Socket.io Client** - Real-time communication
- **SimplePeer** - WebRTC wrapper for video calls

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Socket.io** - WebSocket server
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage and CDN
- **Multer** - File upload handling
- **Nodemailer** - Email service

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd SKILL-SWAP-NEW-
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure Backend Environment Variables** (`.env`):
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/skillswap
JWT_SECRET=your_strong_jwt_secret_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
```

**Get MongoDB URI**:
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a new cluster
- Get your connection string and replace in `MONGO_URI`

**Get Cloudinary Credentials**:
- Sign up at [Cloudinary](https://cloudinary.com/)
- Find your credentials in the dashboard
- Add to `.env` file

**Generate JWT Secret**:
```bash
# On Linux/Mac
openssl rand -base64 32

# Or use any random string generator
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure Frontend Environment Variables** (`.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start the Application

**Terminal 1 - Backend Server**:
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend Dev Server**:
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

### 5. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 📁 Project Structure

```
SKILL-SWAP-NEW-/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js      # Cloudinary configuration
│   │   ├── cors.js             # CORS settings
│   │   ├── db.js               # MongoDB connection
│   │   └── env.js              # Environment validation
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── emailVerificationController.js
│   │   ├── requestController.js
│   │   ├── sessionController.js
│   │   └── skillPostController.js
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT verification
│   │   ├── roleMiddleware.js   # Role-based access
│   │   └── upload.js           # Multer file upload
│   ├── models/
│   │   ├── Request.js
│   │   ├── Session.js
│   │   ├── SkillPost.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── requestRoutes.js
│   │   ├── sessionRoutes.js
│   │   └── skillPostRoutes.js
│   ├── .env
│   ├── app.js                  # Express app setup
│   ├── server.js               # Server entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── SessionButton.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── BookSession.jsx
│   │   │   ├── CreateSkill.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── LearnerDashboard.jsx
│   │   │   ├── LearnerRequests.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MentorDashboard.jsx
│   │   │   ├── MentorRequests.jsx
│   │   │   ├── MentorSessions.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── SkillDetail.jsx
│   │   │   ├── Skills.jsx
│   │   │   └── VideoSession.jsx
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── services/
│   │   │   └── api.js          # Axios configuration
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify-email/:token` - Verify email

### Skill Posts
- `GET /api/skills` - Get all skills
- `GET /api/skills/:id` - Get skill by ID
- `POST /api/skills` - Create skill (Mentor only)
- `PUT /api/skills/:id` - Update skill (Mentor only)
- `DELETE /api/skills/:id` - Delete skill (Mentor only)

### Requests
- `POST /api/requests` - Send request (Learner only)
- `GET /api/requests/mentor` - Get mentor's requests
- `GET /api/requests/learner` - Get learner's requests
- `PATCH /api/requests/:id/accept` - Accept request (Mentor only)
- `PATCH /api/requests/:id/reject` - Reject request (Mentor only)

### Sessions
- `POST /api/sessions` - Create session
- `GET /api/sessions/mentor` - Get mentor sessions
- `GET /api/sessions/learner` - Get learner sessions
- `GET /api/sessions/room/:roomId` - Get session by room ID
- `PATCH /api/sessions/:id/status` - Update session status
- `PATCH /api/sessions/:id/cancel` - Cancel session

## 🎮 Usage Guide

### For Mentors

1. **Register** as a Mentor
2. **Create Skill Posts** - Share what you can teach
3. **Manage Requests** - Accept/reject learner requests
4. **View Sessions** - Check scheduled sessions
5. **Join Video Calls** - Click "Join Now" 15 minutes before session
6. **End Session** - Click "End Call" when finished

### For Learners

1. **Register** as a Learner
2. **Browse Skills** - Explore available skills
3. **Send Requests** - Request to learn from mentors
4. **Book Sessions** - Schedule time after request is accepted
5. **Join Video Calls** - Click "Join Now" when it's time
6. **End Session** - Click "End Call" when finished

## 🔒 Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Protected Routes**: Middleware-based route protection
- **Role-Based Access**: Separate permissions for mentors/learners
- **CORS Configuration**: Controlled cross-origin requests
- **Environment Variables**: Sensitive data protection
- **Input Validation**: Server-side validation
- **Session Security**: Prevents unauthorized session access

## 🌐 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Set environment variables in hosting platform
2. Ensure `NODE_ENV=production`
3. Update `FRONTEND_URL` to production URL
4. Deploy from GitHub repository

### Frontend Deployment (Vercel/Netlify)

1. Build the project: `npm run build`
2. Set `VITE_API_URL` to production backend URL
3. Deploy the `dist` folder
4. Update backend CORS settings with frontend URL

### Environment Variables Checklist

**Backend Production**:
- `PORT`
- `NODE_ENV=production`
- `MONGO_URI` (MongoDB Atlas)
- `JWT_SECRET` (strong secret)
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `FRONTEND_URL` (production URL)

**Frontend Production**:
- `VITE_API_URL` (production backend URL)

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB URI is correct
- Check network access in MongoDB Atlas
- Ensure IP whitelist includes your IP

### CORS Errors
- Verify `FRONTEND_URL` in backend `.env`
- Check CORS configuration in `backend/config/cors.js`
- Ensure both servers are running

### Video Call Not Working
- Allow camera/microphone permissions in browser
- Check firewall settings
- Verify Socket.io connection
- Test with STUN/TURN servers if behind strict NAT

### File Upload Issues
- Verify Cloudinary credentials
- Check file size limits in Multer config
- Ensure proper file types are allowed

## 📝 Scripts

### Backend
```bash
npm start       # Start production server
npm run dev     # Start development server with nodemon
```

### Frontend
```bash
npm run dev     # Start Vite dev server
npm run build   # Build for production
npm run preview # Preview production build
npm run lint    # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Your Name - [Your GitHub Profile]

## 🙏 Acknowledgments

- React team for the amazing library
- MongoDB for the database solution
- Cloudinary for image hosting
- SimplePeer for WebRTC implementation
- Socket.io for real-time communication

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

**Happy Learning! 🎓✨**
