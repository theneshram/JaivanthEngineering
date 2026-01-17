# 🚀 Quick Reference Card

## Directory Structure
```
JaivanthEngineering/
├── src/              ← Frontend (HTML/CSS/JS)
├── api/              ← Backend (Azure Functions)
└── staticwebapp.config.json  ← Routing config
```

## Commands

```bash
# Install everything
npm install && cd api && npm install && cd ..

# Run locally (both frontend + API)
npm run dev

# Build for production
npm run build

# Just API
npm run dev:api

# Just Frontend
npm run dev:frontend
```

## Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | Website |
| API | http://localhost:7071/api | Backend |
| Contact | http://localhost:3000#contact | Form endpoint |
| Health | http://localhost:7071/api/health | Status check |

## File Locations

| What | Where |
|------|-------|
| Website | `src/index.html` |
| Styling | `src/styles.css` |
| Frontend logic | `src/script.js` |
| Contact API | `api/contact/index.ts` |
| Health API | `api/health/index.ts` |
| Config (routing) | `staticwebapp.config.json` |
| Root config | `package.json` |

## Environment Variables

Create `api/local.settings.json`:
```json
{
  "IsEncrypted": false,
  "Values": {
    "SMTP_HOST": "smtp.gmail.com",
    "SMTP_PORT": "587",
    "SMTP_USER": "your-email@gmail.com",
    "SMTP_PASS": "your-app-password",
    "SMTP_FROM": "noreply@jaivantengineering.com",
    "ADMIN_EMAIL": "admin@jaivantengineering.com"
  }
}
```

## API Endpoints

### POST `/api/contact`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "message": "Hello!"
}
```

### GET `/api/health`
Returns:
```json
{
  "status": "OK",
  "timestamp": "2024-01-16T10:30:00Z"
}
```

## Deploy to Azure

1. Push to GitHub
2. Create Static Web App resource
3. Connect GitHub repo
4. Set build location: `/` (root)
5. Set app location: `src`
6. Set API location: `api`
7. Add environment variables
8. Done! 🎉

## Key Changes from Old Structure

| Old | New |
|-----|-----|
| 2 services | 1 deployment |
| Manual CORS | Automatic CORS |
| Port 5000 + 3000 | Unified |
| Express server | Azure Functions |
| Complex setup | `npm run dev` |

## Troubleshooting

```bash
# API not found?
- Check api/ folder exists
- Run npm run dev:api

# Frontend not loading?
- Check src/index.html exists
- Run npm run dev:frontend

# Port already in use?
# Kill process using port:
lsof -i :3000       # Find process
kill -9 <PID>       # Kill it

# Rebuild everything?
rm -rf node_modules api/node_modules
npm install && cd api && npm install
```

## Documentation

- `RESTRUCTURE_SUMMARY.md` - Overview
- `RESTRUCTURE_GUIDE.md` - Detailed guide
- `MIGRATION_COMPLETE.md` - What changed
- `AZURE_DEPLOYMENT.md` - Azure notes

---

**Remember:** Run `npm run dev` from the project root!
