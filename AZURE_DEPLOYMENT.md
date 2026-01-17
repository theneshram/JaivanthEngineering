# Azure Static Web Apps Deployment Guide

## Overview

This project is configured to deploy to **Azure Static Web Apps** with **Azure Functions** for the backend API.

### Architecture
- **Frontend**: Static HTML/CSS/JS served by Azure Static Web Apps
- **Backend API**: Azure Functions (serverless)
- **Email Service**: Nodemailer with SMTP (configured in environment variables)

---

## Prerequisites

1. **Azure Account**: Create one at [portal.azure.com](https://portal.azure.com)
2. **GitHub Account**: Your repository should be pushed to GitHub
3. **Azure CLI**: Install from [here](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)

---

## Step-by-Step Deployment

### 1. Create Azure Static Web App

```bash
# Login to Azure
az login

# Create a resource group
az group create --name jaivant-rg --location eastus

# Create Static Web App
az staticwebapp create \
  --name jaivant-engineering \
  --resource-group jaivant-rg \
  --source https://github.com/theneshram/JaivanthEngineering \
  --branch main \
  --app-location "/" \
  --api-location "api" \
  --output-location "."
```

### 2. Configure Environment Variables in Azure

1. Go to **Azure Portal** → **Static Web Apps** → **jaivant-engineering**
2. Click **Configuration** in the left sidebar
3. Add the following Application settings:

| Name | Value | Note |
|------|-------|------|
| `SMTP_HOST` | `smtp.gmail.com` | Your SMTP server |
| `SMTP_PORT` | `587` | TLS port |
| `SMTP_USER` | `your-email@gmail.com` | Your email |
| `SMTP_PASS` | `your-app-password` | App password (not regular password) |
| `SMTP_FROM` | `noreply@jaivantengineering.com` | From address |
| `ADMIN_EMAIL` | `admin@jaivantengineering.com` | Admin email for notifications |
| `NODE_ENV` | `production` | Environment |

### 3. Get the Deployment Token

1. In **Azure Portal**, go to your Static Web App
2. Click **Manage deployment token**
3. Copy the token

### 4. Add Secret to GitHub

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click **New repository secret**
4. Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
5. Value: Paste the token from step 3

### 5. Push Your Code

```bash
git add .
git commit -m "Configure for Azure Static Web Apps deployment"
git push origin main
```

The GitHub Actions workflow will automatically:
- Build the API (install dependencies, compile TypeScript)
- Deploy to Azure Static Web Apps
- Environment variables will be available to your functions

---

## Local Development

### Run Locally

1. **Install dependencies**:
   ```bash
   cd api
   npm install
   cd ..
   ```

2. **Install Azure Functions Core Tools**:
   ```bash
   npm install -g azure-functions-core-tools@4 --unsafe-perm=true
   ```

3. **Update `api/local.settings.json`** with your SMTP credentials

4. **Start the API**:
   ```bash
   cd api
   func start
   ```

5. **Start the frontend** (in another terminal):
   ```bash
   python -m http.server 3000
   ```

6. **Open** http://localhost:3000

---

## Verify Deployment

1. Go to your Static Web App URL (e.g., `https://jaivant-engineering.azurewebsites.net`)
2. Test the contact form
3. Check that emails are being sent

---

## Troubleshooting

### SMTP Authentication Errors

**Issue**: "Missing credentials for PLAIN"

**Solution**:
- For Gmail: Use [App Passwords](https://support.google.com/accounts/answer/185833), not your regular password
- Verify `SMTP_USER`, `SMTP_PASS`, `SMTP_HOST`, `SMTP_PORT` are set correctly

### Functions Not Running

**Check**:
1. Azure Portal → Static Web App → Function details
2. View deployment logs in GitHub Actions
3. Run `func start` locally to test

### Environment Variables Not Loading

**Check**:
1. Go to Static Web App → Configuration
2. Ensure all variables are saved
3. Redeploy by pushing code again

---

## Project Structure

```
JaivanthEngineering/
├── index.html                      # Homepage
├── styles.css                      # Styles
├── script.js                       # Frontend logic (already configured)
├── staticwebapp.config.json        # Azure SWA routing config
├── api/                            # Azure Functions
│   ├── contact/
│   │   ├── function.json
│   │   └── index.ts               # Contact form handler
│   ├── health/
│   │   ├── function.json
│   │   └── index.ts               # Health check endpoint
│   ├── package.json
│   ├── tsconfig.json
│   └── local.settings.json        # Local development config
├── .github/workflows/
│   └── azure-static-web-apps-deploy.yml  # Deployment workflow
└── backend/                        # Old backend (can be removed)
```

---

## Additional Resources

- [Azure Static Web Apps Docs](https://docs.microsoft.com/en-us/azure/static-web-apps/)
- [Azure Functions with Node.js](https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node)
- [Static Web Apps Configuration](https://docs.microsoft.com/en-us/azure/static-web-apps/configuration)

---

## Support

For issues or questions, check the [Azure Static Web Apps troubleshooting guide](https://docs.microsoft.com/en-us/azure/static-web-apps/troubleshooting).
