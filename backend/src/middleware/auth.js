// Import jsonwebtoken library for verifying JWT tokens
const jwt = require("jsonwebtoken");


// ================= AUTH MIDDLEWARE =================

// Middleware to protect routes that require authentication
function authRequired(req, res, next) {

  // Get Authorization header from request
  // Expected format: "Bearer <token>"
  const header = req.headers.authorization || "";

  // Split header into type and token
  const [type, token] = header.split(" ");

  // Validate header format
  if (type !== "Bearer" || !token) {
    return res.status(401).json({
      message: "Missing or invalid Authorization header"
    });
  }

  try {
    // Verify token using secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user data to request object
    // This allows protected routes to access req.user
    req.user = decoded; // Example: { id, email }

    // Continue to next middleware or route handler
    next();

  } catch {
    // If token is invalid or expired
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}


// Export middleware function
module.exports = { authRequired };