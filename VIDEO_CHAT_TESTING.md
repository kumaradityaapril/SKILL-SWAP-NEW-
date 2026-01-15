# 🎥 Video Chat Testing Guide

## Quick Test: Two Users on Same Computer

### 🔧 Setup

**Step 1: Start Servers**
```bash
# Terminal 1 - Backend
cd backend
npm run dev
# Running on http://localhost:5000

# Terminal 2 - Frontend
cd frontend
npm run dev
# Running on http://localhost:5174
```

---

## 🧪 Test Scenario: Mentor + Learner Video Chat

### Browser 1: Chrome (Mentor)
1. Open **Chrome** browser
2. Go to `http://localhost:5174`
3. **Register/Login as Mentor**
   - Email: `mentor@test.com`
   - Password: `password123`
   - Role: Mentor
4. **Create a Skill**
   - Go to "Create New Skill"
   - Title: "Python Programming"
   - Add description and submit

### Browser 2: Firefox/Edge (Learner)
1. Open **Firefox** or **Edge** browser (different from Chrome)
2. Go to `http://localhost:5174`
3. **Register/Login as Learner**
   - Email: `learner@test.com`
   - Password: `password123`
   - Role: Learner
4. **Send Request**
   - Go to "Explore Skills"
   - Find "Python Programming"
   - Click "Request to Learn"
   - Add message: "I want to learn this skill"
   - Submit

### Browser 1: Chrome (Mentor) - Accept Request
1. Check notification bell (should show "1")
2. Click bell or go to "View Requests"
3. See learner's request
4. Click **"Accept"** button
5. Request status changes to "accepted"

### Browser 2: Firefox/Edge (Learner) - Book Session
1. Check notification bell (should show "1")
2. Go to "My Requests"
3. See accepted request with **"Book Session"** button
4. Click **"Book Session"**
5. Fill in session details:
   - **Date & Time**: Set to current time + 2 minutes (for testing)
   - **Duration**: 30 minutes
   - **Notes**: "Test session"
6. Click **"Book Session"**
7. You'll be redirected to video chat room
8. **Allow camera and microphone** when prompted

### Browser 1: Chrome (Mentor) - Join Session
1. Go to "My Sessions" from dashboard
2. See the booked session
3. Wait for "Join Session" button to become active (15 min before, but for testing it should be active immediately if you set time close)
4. Click **"Join Session"**
5. **Allow camera and microphone** when prompted

---

## ✅ Expected Results

### Both Users Should See:
- ✅ Their own video (small preview)
- ✅ Partner's video (large display)
- ✅ "Connected" status in header
- ✅ Working controls (Mute, Video toggle)
- ✅ Chat section on the right

### Test Each Feature:

**1. Video:**
- [ ] Can see own video
- [ ] Can see partner's video
- [ ] Video is clear and smooth

**2. Audio:**
- [ ] Can hear partner
- [ ] Partner can hear you
- [ ] No echo or feedback

**3. Controls:**
- [ ] Mute button works (audio stops)
- [ ] Video toggle works (video stops)
- [ ] Controls show correct state

**4. Chat:**
- [ ] Can send messages
- [ ] Can receive messages
- [ ] Messages show sender name

**5. End Call:**
- [ ] "End Call" button works
- [ ] Redirects to dashboard
- [ ] Camera/mic are released

---

## 🐛 Troubleshooting

### Issue: "Session not found"
**Solution:** Make sure you booked the session first as learner

### Issue: Can't see partner's video
**Solution:** 
- Check if both users joined the same room
- Refresh both browsers
- Check browser console for errors

### Issue: No audio
**Solution:**
- Check if microphone is muted
- Check browser permissions
- Try different browser

### Issue: Camera not working
**Solution:**
- Allow camera permissions when prompted
- Check if camera is being used by another app
- Try different browser

### Issue: "Join Session" button disabled
**Solution:**
- Button activates 15 minutes before session
- For testing, book session with time = now + 1 minute
- Or modify the code to allow immediate join

---

## 🎯 Quick Test (Skip Time Restriction)

If you want to test immediately without waiting:

**Temporary Fix for Testing:**
In `SessionButton.jsx`, change line:
```javascript
const canJoin = timeUntilSession !== null && timeUntilSession <= 15;
```
To:
```javascript
const canJoin = true; // Allow immediate join for testing
```

Then both users can join immediately after booking!

---

## 📊 Test Checklist

### Pre-Session:
- [ ] Mentor can create skill
- [ ] Learner can send request
- [ ] Mentor receives notification
- [ ] Mentor can accept request
- [ ] Learner receives notification
- [ ] Learner can book session
- [ ] Both see session details

### During Session:
- [ ] Both can join video room
- [ ] Video works both ways
- [ ] Audio works both ways
- [ ] Mute button works
- [ ] Video toggle works
- [ ] Chat works
- [ ] Connection is stable

### Post-Session:
- [ ] End call works
- [ ] Redirects correctly
- [ ] Resources are released
- [ ] Session marked as completed

---

## 💡 Tips

1. **Use Different Browsers**: Chrome for mentor, Firefox for learner
2. **Allow Permissions**: Always allow camera/microphone when prompted
3. **Check Console**: Open browser DevTools (F12) to see any errors
4. **Test Audio First**: Speak and check if partner can hear
5. **Good Lighting**: Helps with video quality
6. **Close Other Apps**: Free up system resources

---

## 🚀 Ready to Test!

1. Start both servers
2. Open two different browsers
3. Follow the steps above
4. Test all features
5. Report any issues

**Your video chat is ready for testing!** 🎉
