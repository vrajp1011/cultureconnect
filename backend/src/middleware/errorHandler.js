// ================= GLOBAL ERROR HANDLER MIDDLEWARE =================

// This middleware handles all errors passed using next(err)
// It should be placed at the end of middleware stack in app.js

function errorHandler(err, req, res, next) {

  // Log the full error in server console (for debugging)
  console.error(err);

  // Send structured error response to client
  // If error has a custom status, use it
  // Otherwise default to 500 (Internal Server Error)
  res.status(err.status || 500).json({
    message: err.message || "Server error"
  });
}

// Export error handler so it can be used in app.js
module.exports = { errorHandler };