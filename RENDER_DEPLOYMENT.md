# 🚀 Deployment Checklist for Render

Follow these steps to deploy CultureConnect to Render.

## Pre-Deployment Checklist

- [ ] All code committed to GitHub
- [ ] .gitignore configured (ignores node_modules, .env, dist)
- [ ] .env.example created and shared
- [ ] Frontend builds successfully (`npm run build`)
- [ ] Backend runs in production mode (`npm start`)
- [ ] No console errors in production build
- [ ] Database migrations are up to date

## Files Required for Deployment

- [x] `render.yaml` - ✓ Created
- [x] `Procfile` - ✓ Created (for Heroku alternative)
- [x] `.env.example` - ✓ Created
- [x] `.gitignore` - ✓ Created
- [x] `root package.json` - ✓ Created
- [x] `DEPLOYMENT.md` - ✓ Created
- [x] `README.md` - ✓ Created
- [x] `frontend/vite.config.js` - ✓ Updated
- [x] `frontend/src/config.js` - ✓ Updated (uses relative URLs)
- [x] `backend/src/app.js` - ✓ Updated (serves frontend from dist)

## Step-by-Step Deployment Guide

### 1. Push to GitHub

```bash
# From project root
git init
git add .
git commit -m "Add deployment configuration"
git remote add origin https://github.com/YOUR_USERNAME/cultureconnect.git
git branch -M main
git push -u origin main
```

### 2. Create Render Account

1. Visit https://render.com
2. Click "Sign up"
3. Choose "GitHub" authentication
4. Grant access to your repositories

### 3. Create Web Service on Render

1. Click "New" button in Render Dashboard
2. Select "Web Service"
3. Choose your repository
4. Click "Connect"

### 4. Configure Service

**Basic Settings:**
- Name: `cultureconnect` (or your preferred name)
- Environment: `Node`
- Region: Choose closest to your users
- Branch: `main`

**Build & Deploy:**
- Build Command: (leave empty - uses render.yaml)
- Start Command: (leave empty - uses render.yaml)

**Plan:**
- Free tier (you can upgrade later)

### 5. Add Environment Variables

In the "Environment" section, add:

```
JWT_SECRET=<generate-a-random-secure-string>
DATABASE_URL=file:./dev.db
CORS_ORIGIN=*
NODE_ENV=production
PORT=10000
```

**To generate JWT_SECRET:**
```bash
# On your machine
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 6. Deploy

Click "Create Web Service" to start deployment.

Render will:
1. Clone your repository
2. Run build command from render.yaml
3. Install backend dependencies
4. Build frontend with `npm run build`
5. Start service with `npm start`
6. Display your URL: `https://cultureconnect-xxxxx.onrender.com`

## Post-Deployment Verification

- [ ] Visit your Render URL in browser
- [ ] Frontend loads successfully
- [ ] Can navigate all pages
- [ ] Register new user works
- [ ] Login works
- [ ] Create post works
- [ ] View posts works
- [ ] Comments work

## Monitoring & Debugging

### View Logs
In Render Dashboard:
1. Select your service
2. Go to "Logs"
3. View real-time application logs

### Common Issues & Solutions

**Build fails with "npm: not found"**
- Render uses Node automatically
- Check render.yaml has correct spacing/formatting (YAML is sensitive)

**Frontend not loading**
- Clear browser cache
- Check Network tab in DevTools (F12)
- Check browser console for errors

**API errors 404/500**
- Check backend logs in Render
- Verify environment variables
- Check database connection

**Stuck on "Building..."**
- Check logs for errors
- May take 5-10 minutes for first build
- Check available disk space

## Database Considerations

### Current: SQLite
- ✓ Works on free tier
- ✗ Data lost if instance restarts
- ✗ Not suitable for production

### Upgrade Options:
1. **Render PostgreSQL Add-on** (recommended)
   - Click "Add Database" in service settings
   - Update DATABASE_URL to PostgreSQL connection string

2. **MongoDB Cloud Atlas**
   - Free tier available
   - Update Prisma schema to use MongoDB provider
   - Set DATABASE_URL to MongoDB connection string

3. **Upgrade Render Plan**
   - Paid plans have persistent storage
   - Minimum $7/month

## Scaling Your Deployment

### Monitor Performance
- Go to "Metrics" in Render Dashboard
- Check CPU and memory usage
- Monitor response times

### Upgrade When Needed
- Free tier: 0.5 CPU, 512MB RAM
- Paid plans: More resources
- Click "Settings" → "Instance Type"

## Security Best Practices

- [ ] Change JWT_SECRET to random value
- [ ] Don't commit .env files
- [ ] Use HTTPS (Render provides automatically)
- [ ] Consider rate limiting for API
- [ ] Add input validation (already done)
- [ ] Keep dependencies updated

## Maintenance

### Regular Tasks
- Monitor logs for errors
- Update Node.js when needed
- Update packages periodically
- Backup database if using PostgreSQL

### Update Deployment
To update your deployed app:
```bash
git push origin main
# Render automatically redeploys on push
```

## Support & Documentation

- Render Docs: https://render.com/docs
- React Docs: https://react.dev
- Prisma Docs: https://www.prisma.io/docs
- Express Docs: https://expressjs.com

## Success! 🎉

Your app is now deployed to Render!

**Your Web App URL:** `https://cultureconnect-xxxxx.onrender.com`

Share with friends and start building your cultural community!

---

**Questions?** Check the logs or review DEPLOYMENT.md for detailed instructions.
