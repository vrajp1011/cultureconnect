// Import Express and create a new Router instance
const router = require("express").Router();

// Import authentication controller functions
// register → handles user registration
// login → handles user login
const { register, login } = require("../controllers/auth.controller");


// ================= AUTH ROUTES =================

// POST /auth/register
// Public route - Allows a new user to create an account
router.post("/register", register);

// POST /auth/login
// Public route - Allows existing user to log in and receive JWT token
router.post("/login", login);


// Export router so it can be used in app.js
module.exports = router;