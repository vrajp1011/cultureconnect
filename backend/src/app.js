require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const { errorHandler } = require("./middleware/errorHandler");

const authRoutes = require("./routes/auth.routes");
const postsRoutes = require("./routes/posts.routes");
const commentsRoutes = require("./routes/comments.routes");

const app = express();


// ================= MIDDLEWARE =================

// Enable CORS (allow frontend access)
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));

// Parse JSON request bodies
app.use(express.json());

// Limit JSON body size to allow base64 images
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));


// ================= ROOT ROUTE =================

// Fix for "Cannot GET /"
app.get("/", (req, res) => {
  res.status(200).json({
    message: "🚀 CultureConnect API is running successfully",
  });
});


// ================= HEALTH CHECK =================

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
  });
});


// ================= API ROUTES =================

app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api", commentsRoutes);


// ================= STATIC FILES & FRONTEND FALLBACK =================

// Serve static files from frontend build
const frontendBuildPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendBuildPath));

// SPA fallback - serve index.html for all non-API routes
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }

  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});


// ================= ERROR HANDLER =================

// Must be last middleware
app.use(errorHandler);


module.exports = app;