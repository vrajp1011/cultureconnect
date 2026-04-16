# CultureConnect - Deployment Guide

A full-stack web application for sharing and discovering cultural experiences.

## Project Structure

```
cultureconnect/
├── backend/           # Express.js API server
│   ├── src/
│   ├── prisma/       # Database schema
│   └── package.json
├── frontend/         # React + Vite frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── package.json      # Root package.json for deployment
├── render.yaml       # Render deployment configuration
└── .env.example     # Environment variables template
```

## Deployment to Render

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Create Render Account & Connect Repository

1. Go to [render.com](https://render.com)
2. Sign up and connect your GitHub account
3. Click "New Web Service"
4. Connect your repository

### Step 3: Configure Render

In Render Dashboard:

1. **Name**: `cultureconnect` (or your preferred name)
2. **Environment**: Node
3. **Region**: Choose closest to your users
4. **Branch**: main
5. **Build Command**: Leave as suggested (it will use render.yaml)
6. **Start Command**: Leave as suggested (it will use render.yaml)
7. **Plan**: Free (you can upgrade later)

### Step 4: Add Environment Variables

In Render Dashboard > Environment:

```
JWT_SECRET=your-secret-key-here (generate a random string)
DATABASE_URL=file:./dev.db
CORS_ORIGIN=*
NODE_ENV=production
```

### Step 5: Deploy

Click "Create Web Service" and Render will:
1. Clone your repository
2. Run build command: `npm run build && cd backend && npm install`
3. Run start command: `npm start`
4. Serve your app at `https://cultureconnect-xxxxx.onrender.com`

## Local Development

### Install Dependencies

```bash
npm run install-all
```

This installs:
- Root dependencies
- Backend dependencies
- Frontend dependencies

### Run Both Servers

```bash
npm run dev
```

This runs:
- Backend on `http://localhost:5001`
- Frontend on `http://localhost:5174`

### Build Frontend for Production

```bash
npm run build
```

This creates `/frontend/dist` with optimized production build.

### Start Production Server

```bash
npm start
```

This runs backend on port specified in `.env` (default 5001) and serves frontend from dist folder.

## Environment Variables

Copy `.env.example` to `.env` and update:

```env
PORT=5001
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
CORS_ORIGIN="*"
NODE_ENV="development"
```

## Features

- ✅ User authentication (JWT)
- ✅ Create posts with images
- ✅ Search and filter posts
- ✅ Comment on posts
- ✅ Responsive design
- ✅ SQLite database
- ✅ Full-stack deployment

## Tech Stack

**Backend:**
- Node.js + Express
- Prisma ORM
- SQLite
- JWT Authentication
- bcrypt Password Hashing

**Frontend:**
- React 19
- Vite
- React Router
- Axios
- CSS3

## API Documentation

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create post (auth required)

### Comments
- `GET /api/posts/:id/comments` - Get comments for post
- `POST /api/posts/:id/comments` - Add comment (auth required)
- `DELETE /api/comments/:id` - Delete comment (auth required)

## Troubleshooting

### Build Issues
If the build fails on Render:
1. Check that all dependencies are in package.json
2. Ensure NODE_ENV is set correctly
3. Verify database path is correct

### Frontend Not Loading
1. Clear browser cache
2. Check console for API errors
3. Verify API_BASE_URL is set correctly in config.js

### Database Issues
SQLite database persists within the Render instance. For production, consider:
1. Using Render's PostgreSQL add-on
2. Using MongoDB Cloud Atlas
3. Upgrading to Render Paid plan for persistent storage

## License

MIT
