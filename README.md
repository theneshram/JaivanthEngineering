# JaivanthEngineering

Modern, professional website for Jaivant Engineering - a precision mechanical engineering and manufacturing company, with integrated SMTP email service.

## Features

🎨 **Modern Design**
- Responsive, mobile-friendly layout
- Smooth animations and transitions
- Professional color scheme
- Curved timeline infographic

⚡ **Performance**
- Fast loading and optimized
- Lazy-loaded images
- CSS animations
- Vanilla JavaScript (no dependencies)

📧 **Email Service**
- SMTP integration with Node.js/Express
- TypeScript backend
- Contact form with validation
- Auto-reply to customers
- HTML email templates

🔒 **Security**
- Environment variables for secrets
- Input validation and sanitization
- CORS protection
- Form validation

## Technologies Used

### Frontend
- HTML5, CSS3, JavaScript
- Font Awesome Icons
- Google Fonts (Poppins, Roboto)
- No build process required

### Backend
- Node.js with Express
- TypeScript
- Nodemailer for SMTP
- Express Validator for input validation

## Project Structure

```
JaivanthEngineering/
├── index.html                 # Main website
├── styles.css                # Website styles
├── script.js                 # Frontend JavaScript
├── assets/                   # Images and assets
│   └── logo.svg
├── backend/                  # Express API server
│   ├── src/
│   │   ├── server.ts        # Main server
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── config/          # Configuration
│   │   ├── templates/       # Email templates
│   │   └── types.ts         # TypeScript types
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example         # Environment template
│   └── .env                 # Environment variables (not in git)
├── README.md                # This file
├── SMTP_SETUP.md           # Email setup guide
├── ENV_SETUP.md            # Environment variables guide
└── .gitignore              # Git ignore rules
```

## Quick Start

### Frontend Only

Simply open `index.html` in your browser. No dependencies required.

### With Email Service

#### 1. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your SMTP credentials
npm run dev
```

#### 2. Configure Environment

Edit `backend/.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@jaivantengineering.com
FRONTEND_URL=http://localhost:3000
```

#### 3. Start Frontend

Open `index.html` or serve with a local server:

```bash
# Using Python
python -m http.server 3000

# Using Node.js
npx http-server -p 3000
```

## Sections

1. **Home** - Hero section with call-to-action
2. **About** - Company information and features
3. **Timeline** - Company milestones infographic
4. **Services** - 6 service offerings
5. **Capabilities** - Technical capabilities
6. **Stats** - Company achievements
7. **Contact** - Contact form with email integration
8. **Footer** - Navigation and social links

## Email Configuration

### Gmail Setup (Recommended)

1. Enable 2-Factor Authentication
2. Generate App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Use the 16-character password in `.env`

See [ENV_SETUP.md](ENV_SETUP.md) for other SMTP providers.

## API Documentation

### POST /api/contact

Send contact form data to backend.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Your message here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully.",
  "messageId": "message-id@example.com"
}
```

## Customization

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --accent-color: #3b82f6;
    /* ... */
}
```

### Content

Edit HTML sections in `index.html`:
- Update company name, description, contact info
- Modify services and capabilities
- Update team and statistics

### Email Templates

Edit `backend/src/templates/contactEmailTemplate.ts`:
- Customize admin notification email
- Customize customer confirmation email
- Add company branding

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Frontend Development

Edit `index.html`, `styles.css`, `script.js` directly.

### Backend Development

```bash
cd backend
npm run dev              # Development with auto-reload
npm run build           # Build TypeScript
npm start               # Run production build
```

## Deployment

### Frontend Only

Deploy `index.html`, `styles.css`, `script.js`, and `assets/` to:
- GitHub Pages
- Netlify
- Vercel
- Any static host

### With Backend

Deploy backend to:
- Heroku
- Railway
- Render
- AWS/Azure/GCP
- VPS/Dedicated Server

Set environment variables on deployment platform.

## Environment Variables

See [ENV_SETUP.md](ENV_SETUP.md) for complete guide.

Required variables:
- `SMTP_HOST` - Email server
- `SMTP_PORT` - Email port
- `SMTP_USER` - Email account
- `SMTP_PASS` - Email password
- `ADMIN_EMAIL` - Admin inbox
- `FRONTEND_URL` - Frontend domain

## Security

- ✅ Environment variables for secrets
- ✅ Input validation on backend
- ✅ HTML email sanitization
- ✅ CORS protection
- ✅ `.env` in `.gitignore`

## License

© 2026 Jaivant Engineering. All rights reserved.

## Support

For issues or questions:
1. Check [SMTP_SETUP.md](SMTP_SETUP.md) for email help
2. Check [ENV_SETUP.md](ENV_SETUP.md) for configuration help
3. Review backend logs: `npm run dev`

## Repository

[GitHub - theneshram/JaivanthEngineering](https://github.com/theneshram/JaivanthEngineering)
