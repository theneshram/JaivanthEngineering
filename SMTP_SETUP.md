# Jaivant Engineering - SMTP Email Service Setup Guide

## Backend Setup

The backend API handles email sending through SMTP. Follow these steps:

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and configure your SMTP settings:

```env
PORT=5000
NODE_ENV=development

# Gmail Example (Recommended for development)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@jaivantengineering.com

ADMIN_EMAIL=admin@jaivantengineering.com
FRONTEND_URL=http://localhost:3000
```

### 3. Gmail App Password Setup

To use Gmail with the SMTP service:

1. Enable 2-Factor Authentication on your Google Account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Select "Mail" and "Windows Computer"
4. Google will generate a 16-character password
5. Use this password in `.env` as `SMTP_PASS`

### 4. Alternative SMTP Providers

**SendGrid:**
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxxxx
```

**Mailgun:**
```
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@yourdomain.com
SMTP_PASS=your-password
```

**AWS SES:**
```
SMTP_HOST=email-smtp.region.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-ses-user
SMTP_PASS=your-ses-password
```

### 5. Run the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm run build
npm start
```

The server will start on `http://localhost:5000`

## Frontend Integration

The contact form automatically sends emails to your backend API. 

**Key Features:**
- Form validation before submission
- Loading state on submit button
- Success/error notifications
- Automatic email to admin
- Confirmation email to customer
- CORS enabled for frontend

## API Endpoints

### POST /api/contact

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Interested in your CNC services"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Email sent successfully. We will get back to you soon.",
  "messageId": "message-id@example.com"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Failed to send email. Please try again later.",
  "error": "Error details"
}
```

## Testing

1. Start the backend server: `npm run dev`
2. Open the website in browser
3. Fill the contact form and submit
4. Check:
   - Admin receives email at `ADMIN_EMAIL`
   - Customer receives confirmation email
   - Browser shows success notification

## Email Templates

Two HTML email templates are automatically generated:

1. **Admin Email:** Contains contact details and message
2. **Customer Email:** Confirmation message with reference ID

Both templates are responsive and styled professionally.

## Troubleshooting

**"SMTP connection failed"**
- Check SMTP credentials in `.env`
- Verify Gmail app password (if using Gmail)
- Ensure 2FA is enabled for Gmail account

**"Email sent but not received"**
- Check spam/junk folder
- Verify `ADMIN_EMAIL` and `SMTP_FROM` are correct
- Check SMTP provider's sending limits

**CORS errors**
- Ensure `FRONTEND_URL` in `.env` matches your frontend URL
- Default is `http://localhost:3000`

**Form validation errors**
- Name: minimum 2 characters
- Email: valid email format
- Message: minimum 10 characters
- Phone: optional, numbers only

## Security Notes

- Never commit `.env` file to repository
- Use environment variables for all sensitive data
- Update SMTP credentials regularly
- Validate all form inputs on backend
- Use HTTPS in production
