// Import bcrypt for password hashing
const bcrypt = require("bcrypt");

// Import Prisma client to interact with database
const prisma = require("../config/prisma");

// Import function to generate JWT token
const { signToken } = require("../utils/tokens");


// ================= REGISTER FUNCTION =================
async function register(req, res, next) {
  try {
    // Extract user input from request body
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email, password are required" });
    }

    // Check if user already exists with same email
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Hash password before saving to database (security best practice)
    const hashed = await bcrypt.hash(password, 10); // 10 = salt rounds

    // Create new user in database
    const user = await prisma.user.create({
      data: { 
        name, 
        email, 
        password: hashed 
      },
      // Select only safe fields (exclude password)
      select: { 
        id: true, 
        name: true, 
        email: true, 
        createdAt: true 
      },
    });

    // Generate JWT token for authentication
    const token = signToken({ id: user.id, email: user.email });

    // Send response with user data and token
    res.status(201).json({ user, token });

  } catch (err) {
    // Pass errors to global error handler
    next(err);
  }
}


// ================= LOGIN FUNCTION =================
async function login(req, res, next) {
  try {
    // Extract login credentials
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });

    // If user not found, return unauthorized
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare provided password with hashed password in database
    const ok = await bcrypt.compare(password, user.password);

    // If password does not match
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token after successful login
    const token = signToken({ id: user.id, email: user.email });

    // Send user info (excluding password) and token
    res.json({
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email 
      },
      token
    });

  } catch (err) {
    // Pass errors to global error handler
    next(err);
  }
}


// Export functions so they can be used in routes
module.exports = { register, login };