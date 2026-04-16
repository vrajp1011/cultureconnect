# 🏗️ CultureConnect - Architecture & Deployment Guide

## Architecture Overview

### During Development
```
┌─────────────────────────────────────────────────────┐
│                    Your Computer                     │
├─────────────────────────────────────────────────────┤
│                                                       │
│  Frontend Dev Server          Backend Server         │
│  ┌──────────────────────┐    ┌──────────────────┐  │
│  │ Vite Dev Server      │    │ Express Server   │  │
│  │ http://5174          │    │ http://5001      │  │
│  │                      │    │                  │  │
│  │ • React Components   │    │ • API /auth      │  │
│  │ • Hot Reload         │    │ • API /posts     │  │
│  │ • Dev Tools          │    │ • API /comments  │  │
│  │                      │    │ • Prisma         │  │
│  └──────────────────────┘    │ • SQLite DB      │  │
│           │                  └──────────────────┘  │
│           │ HTTP Calls                 │             │
│           └──────────────────────────────┘           │
│                                                       │
└─────────────────────────────────────────────────────┘
```

### After Build
```
┌──────────────────────────────────────────────────────┐
│              Built Project Structure                 │
├──────────────────────────────────────────────────────┤
│                                                       │
│  backend/                frontend/                   │
│  ├── src/                ├── src/                    │
│  ├── prisma/             ├── dist/ ← BUILD OUTPUT   │
│  │   └── dev.db          │   ├── index.html        │
│  └── node_modules        │   └── assets/           │
│                          │       ├── CSS           │
│                          │       └── JS            │
│                          └── node_modules          │
│                                                       │
└──────────────────────────────────────────────────────┘
```

### Deployed on Render
```
┌─────────────────────────────────────────────────────┐
│            Render.com Server (Single Node)          │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Express.js Server (Port 10000)                    │
│  ┌──────────────────────────────────────────────┐  │
│  │                                               │  │
│  │  Static Files (Frontend)                      │  │
│  │  ┌─────────────────────────────────────────┐ │  │
│  │  │ /index.html, /assets/...js, /assets/... │ │  │
│  │  │ Served for all non-API routes            │ │  │
│  │  └─────────────────────────────────────────┘ │  │
│  │                                               │  │
│  │  API Routes                                  │  │
│  │  ┌─────────────────────────────────────────┐ │  │
│  │  │ /api/auth/register                       │ │  │
│  │  │ /api/auth/login                          │ │  │
│  │  │ /api/posts                               │ │  │
│  │  │ /api/posts/:id                           │ │  │
│  │  │ /api/comments                            │ │  │
│  │  └─────────────────────────────────────────┘ │  │
│  │                                               │  │
│  │  SQLite Database                             │  │
│  │  ┌─────────────────────────────────────────┐ │  │
│  │  │ dev.db                                   │ │  │
│  │  └─────────────────────────────────────────┘ │  │
│  │                                               │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
│  URL: https://cultureconnect-xxxxx.onrender.com   │
└─────────────────────────────────────────────────────┘
```

---

## Request Flow (Production)

### 1. User Visits App
```
Browser → https://cultureconnect-xxxxx.onrender.com
                           ↓
                   Render Server
                           ↓
              Serves index.html from dist
                           ↓
         React App Loads (JS + CSS)
```

### 2. User Registers
```
React Component
    ↓
Calls POST /api/auth/register
    ↓ (relative URL)
Express Backend (/api/auth endpoint)
    ↓
Password Hashing (bcrypt)
    ↓
Create User in SQLite
    ↓
Generate JWT Token
    ↓
Return {user, token}
    ↓
React Stores Token
    ↓
Redirects to /posts
```

### 3. User Creates Post
```
React Component (CreatePost)
    ↓
POST /api/posts
(includes image as base64)
    ↓
Express Backend
    ↓
Verify JWT Token
    ↓
Create Post in SQLite
    ↓
Return Post Data
    ↓
React Adds to List
```

---

## Deployment Flow - Render

### Step 1: Push Code
```bash
git push origin main
        ↓
    GitHub
```

### Step 2: Render Detects Changes
```
GitHub → Webhook → Render
        ↓
  Render Triggered
```

### Step 3: Build Process
```
Build Command (from render.yaml):
    ↓
npm run build
    ↓
cd frontend && npm run build
    ↓
Creates /frontend/dist
    ↓
cd backend && npm install
    ↓
Installs backend dependencies
```

### Step 4: Start Application
```
Start Command (from render.yaml):
    ↓
npm start
    ↓
node backend/src/server.js
    ↓
Express Server Starts
    ↓
Serves Static Files + API
    ↓
Available at: https://cultureconnect-xxxxx.onrender.com
```

---

## File Routing (Production)

### Static Files (Served by Express)
```
Request: GET /
Response: frontend/dist/index.html

Request: GET /posts
Response: frontend/dist/index.html (SPA Routing)

Request: GET /assets/index-abc123.js
Response: frontend/dist/assets/index-abc123.js

Request: GET /login
Response: frontend/dist/index.html (SPA Routing)
```

### API Routes (Handled by Express)
```
Request: POST /api/auth/register
Response: JSON {user, token}

Request: GET /api/posts
Response: JSON [posts]

Request: POST /api/posts/:id/comments
Response: JSON {comment}
```

---

## Environment Variables Flow

### Development
```
.env (local)
    ↓
backend/src/server.js
    ↓
require('dotenv').config()
    ↓
process.env.PORT = 5001
process.env.JWT_SECRET = "dev-secret"
process.env.DATABASE_URL = "file:./dev.db"
```

### Production (Render)
```
Render Dashboard
    ↓
Environment Variables
    ↓
Set when container starts
    ↓
process.env.PORT = 10000
process.env.JWT_SECRET = "xxxx"
process.env.DATABASE_URL = "file:./dev.db"
```

---

## Build Process Details

### Frontend Build
```
src/App.jsx, src/main.jsx, etc.
    ↓
Vite Bundling
    ↓
React Compilation
    ↓
CSS Processing
    ↓
Asset Optimization
    ↓
Output: frontend/dist/
    ├── index.html (0.45 kB)
    ├── assets/
    │   ├── index-xxxxx.css (25.57 kB)
    │   └── index-xxxxx.js (281.70 kB)
    └── vite.svg
```

### Backend
```
No build needed!
Just install dependencies and run.

package.json
    ↓
npm install
    ↓
node_modules/
    ↓
Ready to start: npm start
```

---

## Network Topology

### Development
```
Your Browser
    ↓ Port 5174 ↓ Port 5001
    ↓           ↓
Frontend    Backend
Dev Server  Server
    │           │
    └─ API Calls ─┘
```

### Production (Render)
```
Internet
    ↓
Browser (HTTPS)
    ↓
Render Server (Single)
    ├─ Serves Frontend (index.html, JS, CSS)
    └─ Serves API (/api/auth, /api/posts, etc.)
    ↓
SQLite Database
```

---

## Data Flow

### Authentication
```
User Form Input → Axios POST → Express Route
    ↓
Validate Input
    ↓
Check Existing User (SQLite)
    ↓
Hash Password (bcrypt)
    ↓
Save to Database
    ↓
Generate JWT
    ↓
Return {user, token}
    ↓
Store in localStorage
    ↓
Set Authorization Header
```

### Creating a Post
```
User Fills Form → Image Selected
    ↓
Convert to Base64
    ↓
Create Post Object (with image)
    ↓
POST /api/posts
    ↓
Include JWT in Header
    ↓
Backend Validates User
    ↓
Save Post with Image to Database
    ↓
Return Post Data
    ↓
Frontend Updates UI
```

---

## Performance Considerations

### Frontend (Production)
- ✅ Minified JavaScript (281 KB → ~91 KB gzipped)
- ✅ Optimized CSS (25 KB → ~4 KB gzipped)
- ✅ Static file caching
- ✅ Fast initial load time

### Backend
- ✅ Express.js (lightweight, fast)
- ✅ SQLite (sufficient for small-medium apps)
- ✅ JWT for stateless auth
- ✅ CORS enabled for all origins

---

## Scaling Strategy

### Current (Free Tier)
```
✅ Single Render instance
✅ SQLite database
✅ 0.5 CPU, 512MB RAM
✅ ~100 concurrent users
```

### Growth (Upgrade Path)
```
→ Render Paid Tier (more CPU/RAM)
→ Add Render PostgreSQL
→ Scale to thousands of users
→ Add caching layer (Redis)
→ Use CDN for static files
```

---

## Key URLs After Deployment

```
Frontend:     https://cultureconnect-xxxxx.onrender.com
API Base:     https://cultureconnect-xxxxx.onrender.com/api
Register:     POST https://cultureconnect-xxxxx.onrender.com/api/auth/register
Login:        POST https://cultureconnect-xxxxx.onrender.com/api/auth/login
Posts List:   GET  https://cultureconnect-xxxxx.onrender.com/api/posts
Create Post:  POST https://cultureconnect-xxxxx.onrender.com/api/posts
```

---

## Summary

✅ **Single Repository**: Frontend + Backend together
✅ **Single Deploy**: One Render service
✅ **Single URL**: Everything at one domain
✅ **Easy Updates**: Push to GitHub, Render redeploys
✅ **Production Ready**: All optimizations applied
✅ **Scalable**: Can upgrade when needed

**Ready to deploy!** 🚀
