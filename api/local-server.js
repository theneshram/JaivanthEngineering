const express = require('express');
const cors = require('cors');
require('dotenv').config();
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 7071;

// Middleware
app.use(express.json());
app.use(cors());

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Contact form submission received');

  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name is required and must be at least 2 characters'
      });
    }

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Valid email is required'
      });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message is required and must be at least 10 characters'
      });
    }

    const contactData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : undefined,
      message: message.trim()
    };

    // For local development, just log the message
    console.log('Contact form submission:', contactData);

    return res.json({
      success: true,
      message: 'Your message has been received! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Contact function error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Contact form: POST http://localhost:${PORT}/api/contact`);
});
