# 🌍 CultureConnect

A full-stack web application for sharing and discovering cultural experiences from around the world.

![React](https://img.shields.io/badge/React-19.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![Express](https://img.shields.io/badge/Express-5.x-gray)
![Vite](https://img.shields.io/badge/Vite-7.x-purple)

## Features

✨ **User Authentication**
- JWT-based authentication
- Secure password hashing with bcrypt
- Persistent sessions with localStorage

📸 **Cultural Posts**
- Create posts with images (base64 encoding)
- Add title, category, country of origin, and detailed content
- Edit and delete posts

🔍 **Search & Filter**
- Search posts by title and content
- Filter by category (Food, Music, Art, Tradition, Festival, Language)
- Real-time filtering

💬 **Comments & Discussion**
- Add comments to posts
- Delete your own comments
- See who commented on each post

🎨 **Responsive Design**
- Mobile-first design
- Works on desktop, tablet, and mobile
- Beautiful gradient UI with smooth animations

## Tech Stack

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **Prisma** - ORM
- **SQLite** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin requests

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **CSS3** - Styling

## Project Structure

```
cultureconnect/
├── backend/                 # Express API server
│   ├── src/
│   │   ├── app.js          # Express app setup
│   │   ├── server.js       # Server entry point
│   │   ├── controllers/    # Route handlers
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── config/         # Configuration files
│   │   └── utils/          # Utility functions
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   ├── migrations/     # Database migrations
│   │   └── seed.js         # Seed data
│   └── package.json
│
├── frontend/                # React Vite app
│   ├── src/
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # Entry point
│   │   ├── components/     # React components
│   │   ├── context/        # Context API
│   │   ├── config.js       # API configuration
│   │   └── styles.css      # Global styles
│   ├── dist/               # Production build (built)
│   └── package.json
│
├── package.json            # Root package.json for monorepo
├── .gitignore             # Git ignore rules
├── .env.example           # Environment variables template
├── render.yaml            # Render deployment config
├── Procfile              # Heroku/Render config
├── DEPLOYMENT.md         # Deployment instructions
└── README.md            # This file
```

## Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/cultureconnect.git
cd cultureconnect
```

2. Install all dependencies
```bash
npm run install-all
```

This installs dependencies for:
- Root project
- Backend
- Frontend

3. Create environment file
```bash
cp .env.example backend/.env
```

4. Setup database
```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
cd ..
```

### Development

Start both servers concurrently:
```bash
npm run dev
```

This runs:
- **Backend**: `http://localhost:5001`
- **Frontend**: `http://localhost:5174`

### Production Build

Build the frontend for production:
```bash
npm run build
```

This creates `/frontend/dist` with optimized files.

### Start Production Server

```bash
npm start
```

Backend serves both API and frontend from `http://localhost:5001`

## API Endpoints

### Authentication
```
POST   /api/auth/register        Register new user
POST   /api/auth/login          Login user
```

### Posts
```
GET    /api/posts               Get all posts
GET    /api/posts/:id           Get post by ID
POST   /api/posts               Create new post (auth required)
```

### Comments
```
GET    /api/posts/:id/comments   Get comments for post
POST   /api/posts/:id/comments   Add comment (auth required)
DELETE /api/comments/:id         Delete comment (auth required)
```

## Environment Variables

### Backend
```env
PORT=5001
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
CORS_ORIGIN="*"
NODE_ENV="development"
```

## Deployment

### Deploy to Render

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/cultureconnect.git
git push -u origin main
```

2. **Create Render Service**
   - Go to [render.com](https://render.com)
   - Click "New Web Service"
   - Connect your GitHub repository
   - Select `main` branch

3. **Configure**
   - **Build Command**: (auto-detected from render.yaml)
   - **Start Command**: (auto-detected from render.yaml)

4. **Add Environment Variables**
   In Render Dashboard > Environment:
   ```
   JWT_SECRET=generate-a-random-string
   DATABASE_URL=file:./dev.db
   CORS_ORIGIN=*
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy automatically

Your app will be available at: `https://cultureconnect-xxxxx.onrender.com`

### Deploy to Heroku (Alternative)

```bash
heroku create your-app-name
heroku config:set JWT_SECRET="your-secret"
git push heroku main
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## Usage Examples

### Register a New User
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create a Post
```bash
curl -X POST http://localhost:5001/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Italian Pasta Making",
    "category": "Food",
    "country": "Italy",
    "content": "Learn how to make authentic Italian pasta...",
    "imageUrl": "data:image/png;base64,..."
  }'
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

### Frontend not loading after deployment
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors (F12)
- Verify API_BASE_URL in frontend/src/config.js

### API errors
- Check backend logs on Render dashboard
- Verify environment variables are set
- Ensure JWT_SECRET is configured

### Database issues
- SQLite persists within Render instance
- For production, consider upgrading to Render Postgres add-on
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for database options

## License

MIT License - see LICENSE file for details

## Support

For issues and support, please:
1. Check existing GitHub issues
2. Search the documentation
3. Create a new issue with detailed information

## Roadmap

- [ ] User profiles
- [ ] Follow/unfollow users
- [ ] Like/react to posts
- [ ] Notifications
- [ ] Private messaging
- [ ] Video uploads
- [ ] Admin dashboard
- [ ] Post moderation

---

Made with ❤️ by the CultureConnect Team
