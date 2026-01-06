# Environment Variables Guide for Jaivant Engineering

## Overview

Environment variables are used to manage sensitive configuration and secrets without exposing them in the codebase. This guide explains how to configure your `.env` file.

## File Location

```
backend/.env
```

## Important Security Notes

⚠️ **NEVER commit `.env` to git!**
- The `.gitignore` file already excludes `.env`
- Only `.env.example` should be in version control
- Keep `.env` on your local machine and deployment servers

## Environment Variables Explained

### Server Configuration

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `PORT` | Express server port | 5000 | 5000 |
| `NODE_ENV` | Environment type | development | development, production |

### SMTP Configuration (Email)

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `SMTP_HOST` | SMTP server host | Yes | smtp.gmail.com |
| `SMTP_PORT` | SMTP server port | Yes | 587 (TLS), 465 (SSL) |
| `SMTP_USER` | SMTP username/email | Yes | your-email@gmail.com |
| `SMTP_PASS` | SMTP password/token | Yes | 16-char app password |
| `SMTP_FROM` | From email address | Yes | noreply@jaivantengineering.com |
| `ADMIN_EMAIL` | Admin email for notifications | Yes | admin@jaivantengineering.com |

### Frontend Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `FRONTEND_URL` | Frontend domain for CORS | http://localhost:3000 |

### Logging

| Variable | Description | Default | Values |
|----------|-------------|---------|--------|
| `LOG_LEVEL` | Logging verbosity | info | debug, info, warn, error |

## Setup Instructions

### 1. Copy Example File

```bash
cd backend
cp .env.example .env
```

### 2. Configure Gmail (Recommended for Development)

**Step-by-step:**

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click "Security" in left sidebar
3. Enable "2-Step Verification" (if not already enabled)
4. Go to [App Passwords](https://myaccount.google.com/apppasswords)
5. Select "Mail" and "Windows Computer"
6. Google generates a 16-character password
7. Copy this password to `SMTP_PASS` in `.env`

**Example .env for Gmail:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=xyza bcde fghi jklm
SMTP_FROM=your-email@gmail.com
ADMIN_EMAIL=your-email@gmail.com
```

### 3. Alternative SMTP Providers

**SendGrid:**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.your-sendgrid-api-key
```

**Mailgun:**
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@yourdomain.com
SMTP_PASS=your-mailgun-password
```

**AWS SES:**
```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-ses-username
SMTP_PASS=your-ses-password
```

**Office 365:**
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=your-email@company.com
SMTP_PASS=your-office-password
```

### 4. Configure for Different Environments

**Development (.env):**
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
LOG_LEVEL=debug
```

**Production:**
- Deploy `.env` to server using secure methods (SSH, deployment tools)
- Use production email credentials
- Set `NODE_ENV=production`
- Use production `FRONTEND_URL`

## Usage in Code

The `.env` variables are loaded automatically by `dotenv` in [backend/src/server.ts](../backend/src/server.ts):

```typescript
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;
const adminEmail = process.env.ADMIN_EMAIL;
```

## Validation

The application validates required environment variables on startup:

```bash
npm run dev
```

If variables are missing, you'll see errors like:
```
✗ SMTP connection failed: No auth provided
```

Fix by ensuring all required variables are set in `.env`.

## Development Workflow

1. **Local Development:**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   npm run dev
   ```

2. **Team Collaboration:**
   - Share `.env.example` (no secrets)
   - Each developer creates their own `.env` locally
   - Never share `.env` files

3. **Production Deployment:**
   - Use secure deployment secrets management
   - GitHub Secrets, AWS Systems Manager, HashiCorp Vault, etc.
   - Set environment variables on server/container

## Common Issues

### "SMTP connection failed"
- Check `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- Verify Gmail app password (not regular password)
- Ensure 2FA is enabled for Gmail

### "Admin email not configured"
- Check `ADMIN_EMAIL` is set and valid

### "CORS error"
- Verify `FRONTEND_URL` matches your frontend domain
- Default: `http://localhost:3000`

### Variables not loading
- Ensure `.env` file exists in `backend/` directory
- Restart the server after editing `.env`
- Check for typos in variable names

## Security Best Practices

✅ **Do:**
- Use strong, unique passwords
- Rotate credentials regularly
- Use app-specific passwords (not account password)
- Store `.env` in secure location
- Use `.gitignore` to exclude `.env`

❌ **Don't:**
- Commit `.env` to git
- Share `.env` files in chat/email
- Use same password for multiple services
- Hardcode secrets in code
- Log sensitive values

## Environment Variable Checklist

- [ ] `PORT` - Server port configured
- [ ] `NODE_ENV` - Set to development or production
- [ ] `SMTP_HOST` - Email provider host
- [ ] `SMTP_PORT` - Email provider port
- [ ] `SMTP_USER` - Email account
- [ ] `SMTP_PASS` - Email password/token
- [ ] `SMTP_FROM` - From email address
- [ ] `ADMIN_EMAIL` - Admin inbox email
- [ ] `FRONTEND_URL` - Frontend domain
- [ ] `.env` in `.gitignore` - Secret file not tracked

## Additional Resources

- [Node.js dotenv documentation](https://www.npmjs.com/package/dotenv)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [12 Factor App - Config](https://12factor.net/config)
