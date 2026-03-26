// Import StrictMode from React for development warnings and checks
import { StrictMode } from 'react';
// Import createRoot from React DOM for rendering the app
import { createRoot } from 'react-dom/client';
// Import the main App component
import App from './App.jsx';

// Create a root container and render the App component inside StrictMode
// This is the entry point where React mounts the application to the DOM
createRoot(document.getElementById('root')).render(
  // StrictMode helps identify potential problems in the application during development
  <StrictMode>
    {/* Render the main App component */}
    <App />
  </StrictMode>,
);
