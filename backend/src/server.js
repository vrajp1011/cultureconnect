// Import the configured Express application
// (All middleware, routes, and error handlers are defined in app.js)
const app = require("./app");

// Set server port
// Use environment variable PORT if available (for deployment)
// Otherwise default to 5000 for local development
const PORT = process.env.PORT || 5000;


// ================= START SERVER =================

// Start the Express server and listen on specified port
const server = app.listen(PORT, () => {

  // Log message when server successfully starts
  console.log(`Backend running on http://localhost:${PORT}`);

});

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
});