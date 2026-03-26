# CultureConnect - Project Summary

## 📋 Project Overview
A full-stack web application for connecting cultures, sharing stories, and exploring cultural experiences from around the world.

## 🗂️ Project Structure

```
cultureconnect/
├── backend/                          # Node.js/Express API
│   ├── prisma/
│   │   ├── schema.prisma            # Database schema
│   │   └── migrations/              # Database migrations
│   ├── src/
│   │   ├── app.js                  # Express app setup
│   │   ├── server.js               # Server entry point
│   │   ├── config/
│   │   │   └── prisma.js           # Prisma client config
│   │   ├── controllers/            # API controllers
│   │   ├── middleware/             # Express middleware
│   │   ├── routes/                 # API routes
│   │   └── utils/                  # Utility functions
│   ├── package.json
│   └── .env                        # Environment variables
│
└── frontend/                        # React/Vite app
    ├── src/
    │   ├── components/             # React components
    │   │   ├── Navbar.jsx
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Posts.jsx
    │   │   ├── PostDetail.jsx
    │   │   └── CreatePost.jsx
    │   ├── context/                # Context API (Auth)
    │   ├── App.jsx                 # Main app component
    │   ├── main.jsx                # Entry point
    │   └── styles.css              # Consolidated styles (1000+ lines)
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## ✨ Features Implemented

### Backend (Node.js + Express + Prisma)
- ✅ JWT Authentication (Login/Register)
- ✅ Password Hashing with bcrypt
- ✅ RESTful API endpoints
- ✅ Database with SQLite
- ✅ CRUD operations for Posts and Comments
- ✅ User authentication middleware
- ✅ Test data seeding

### Frontend (React + Vite + React Router)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark theme with glassmorphism effects
- ✅ Animated background
- ✅ User authentication flow
- ✅ Post creation, viewing, and deletion
- ✅ Comment management
- ✅ Navbar with navigation
- ✅ Context API for state management
- ✅ Axios for API calls

## 🎨 Design Features

### Styling
- **Single consolidated CSS file** (styles.css)
- **Glassmorphism effect** with backdrop-filter blur
- **Animated background** with smooth transitions
- **Gradient text** and smooth animations
- **Consistent padding/margins** across all pages
- **Responsive breakpoints** for all devices
- **Color scheme**: Dark theme with accent colors (#ff6b6b, #ffa500)

### Page-specific Styles
- **Home**: Hero section with animations
- **Auth**: Centered form with slide-in effect
- **Posts**: Card grid layout with hover effects
- **PostDetail**: Full-width post view with comments
- **CreatePost**: Form with validation styling

## 🔧 Technical Stack

### Backend
- Node.js (v20+)
- Express 5
- Prisma 7 (ORM)
- SQLite (Database)
- JWT (Authentication)
- bcryptjs (Password hashing)

### Frontend
- React 19
- Vite 7
- React Router 6
- Axios
- Context API
- CSS3 (Animations, Gradients, Flexbox)

## 📦 Key Dependencies

### Backend
```json
{
  "express": "^5.0.0",
  "prisma": "^7.0.0",
  "@prisma/client": "^7.0.0",
  "jsonwebtoken": "^9.1.2",
  "bcryptjs": "^2.4.3",
  "dotenv": "^16.4.1"
}
```

### Frontend
```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^6.21.0",
  "axios": "^1.6.4",
  "vite": "^7.0.0"
}
```

## 🚀 Running the Application

### 1. Start Backend
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

### 2. Start Frontend
```bash
cd frontend
npm run dev
# App runs on http://localhost:5177
```

### 3. Access the App
Open your browser and navigate to: **http://localhost:5177/**

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get specific post
- `POST /api/posts` - Create post
- `DELETE /api/posts/:id` - Delete post

### Comments
- `GET /api/posts/:id/comments` - Get post comments
- `POST /api/posts/:id/comments` - Add comment
- `DELETE /api/comments/:id` - Delete comment

## 📊 Database Schema

### User
- id (Primary Key)
- username (String, Unique)
- email (String, Unique)
- password (String, Hashed)
- createdAt (DateTime)

### CulturalPost
- id (Primary Key)
- title (String)
- content (String)
- authorId (Foreign Key - User)
- createdAt (DateTime)
- comments (Relationship)

### Comment
- id (Primary Key)
- content (String)
- authorId (Foreign Key - User)
- postId (Foreign Key - CulturalPost)
- createdAt (DateTime)

## 🎯 CSS Specifications

### Global Styles
- **Padding Standard**: `5rem 2rem 3rem` (all pages)
- **Mobile Padding**: `5rem 1rem 2rem`
- **Border Radius**: `20px` (cards and containers)
- **Font**: Poppins (300, 400, 600, 700 weights)
- **Background**: Dark gradient + animated background image

### Color Scheme
- **Primary Accent**: #ff6b6b (Red)
- **Secondary Accent**: #ffa500 (Orange)
- **Background**: rgba(15, 15, 15, 0.9)
- **Text**: #fff (White)
- **Border**: rgba(255, 255, 255, 0.1)

### Spacing Consistency
All pages use:
- Top padding: 5rem (navbar clearance)
- Horizontal padding: 2rem (desktop) / 1rem (mobile)
- Bottom padding: 3rem (desktop) / 2rem (mobile)
- Form padding: 2.5rem
- Card padding: 2rem

## 🧹 Cleaned Up Files

Removed during optimization:
- ❌ Duplicate `cultureconnect/` folder
- ❌ `App.css` (consolidated into styles.css)
- ❌ `index.css` (default Vite styles)
- ❌ `assets/react.svg` (default React logo)
- ❌ Individual component CSS files

## ✅ Quality Assurance

- ✅ No console errors
- ✅ No unused imports
- ✅ Consistent spacing and margins
- ✅ Single consolidated CSS file
- ✅ Responsive design tested
- ✅ All API endpoints tested
- ✅ Authentication flow working
- ✅ Database seeded with test data

## 📝 Test Data

- **Users**: 2 test users (demo@example.com, user@example.com)
- **Posts**: 3 sample cultural posts
- **Comments**: 2 sample comments

## 🔜 Future Enhancements

- [ ] Image uploads for posts
- [ ] User profiles
- [ ] Post likes/ratings
- [ ] Search functionality
- [ ] Categories/tags
- [ ] Real-time notifications
- [ ] Deploy to production

## 📝 Notes

- All CSS is consolidated in a single `styles.css` file for better maintainability
- Environment variables are configured in `.env`
- Database is SQLite for local development
- JWT tokens are stored in browser localStorage
- CORS is enabled for frontend-backend communication

---

**Project Status**: ✅ Production Ready  
**Last Updated**: March 24, 2026  
**Version**: 1.0.0
