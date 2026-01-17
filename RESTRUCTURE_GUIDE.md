# Jaivant Engineering - Azure Static Web App

A consolidated web application for Jaivant Engineering, combining frontend and backend into a single Azure Static Web App deployment.

## 📁 Project Structure

```
JaivanthEngineering/
├── src/                          # Frontend (HTML, CSS, JS, Assets)
│   ├── index.html               # Main website
│   ├── styles.css               # Global styling
│   ├── script.js                # Frontend logic
│   └── assets/                  # Images, logos, etc.
│
├── api/                         # Azure Functions Backend
│   ├── contact/                 # Contact form function
│   │   ├── function.json        # Function configuration
│   │   └── index.ts             # Contact form handler
│   ├── health/                  # Health check function
│   │   ├── function.json
│   │   └── index.ts
│   ├── package.json             # Dependencies
│   ├── tsconfig.json            # TypeScript config
│   └── local.settings.json      # Local development settings
│
├── staticwebapp.config.json     # Azure Static Web App routing config
├── package.json                 # Root project config
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Azure Functions Core Tools v4
- Python 3.8+ (for local frontend server)

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   cd api && npm install && cd ..
   ```

2. **Set up environment variables:**
   Create `api/local.settings.json`:
   ```json
   {
     "IsEncrypted": false,
     "Values": {
       "AzureWebJobsStorage": "",
       "FUNCTIONS_WORKER_RUNTIME": "node",
       "SMTP_HOST": "smtp.gmail.com",
       "SMTP_PORT": "587",
       "SMTP_USER": "your-email@gmail.com",
       "SMTP_PASS": "your-app-password",
       "SMTP_FROM": "noreply@jaivantengineering.com",
       "ADMIN_EMAIL": "admin@jaivantengineering.com"
     }
   }
   ```

3. **Run locally:**
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:3000
   - API: http://localhost:7071/api

### Build for Production

```bash
npm run build
```

This builds the Azure Functions for deployment.

## 📋 Configuration

### staticwebapp.config.json
Defines routing rules for Azure Static Web App:
- `/` → Serves `index.html` (SPA routing)
- `/api/*` → Routes to Azure Functions
- `/assets/*` → Static asset caching

### Frontend API Endpoint
Update in `src/script.js` if needed:
```javascript
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:7071/api'
  : `${window.location.origin}/api`;
```

## 🔌 API Endpoints

### POST `/api/contact`
Contact form submission

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Your message here..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "..."
}
```

### GET `/api/health`
Health check endpoint

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-16T10:30:00Z"
}
```

## 🌐 Deployment to Azure

### Prerequisites
- Azure account with active subscription
- Azure CLI configured
- GitHub repository linked

### Deploy via Azure Portal

1. Create a new **Static Web App** resource
2. Connect your GitHub repository
3. Configure build settings:
   - **Build location:** `/` (root)
   - **App location:** `src`
   - **API location:** `api`
4. Add environment variables in Azure Portal
5. Deploy!

### Deploy via Azure CLI

```bash
az staticwebapp create \
  --name jaivant-engineering \
  --resource-group my-resource-group \
  --source https://github.com/theneshram/JaivanthEngineering \
  --branch main \
  --app-location src \
  --api-location api \
  --output-location ""
```

### GitHub Actions Workflow

Azure automatically creates a GitHub Actions workflow. Customize `.github/workflows/azure-static-web-apps-*.yml`:

```yaml
- name: Build And Deploy
  uses: Azure/static-web-apps-deploy@v1
  with:
    azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_TOKEN }}
    repo_token: ${{ secrets.GITHUB_TOKEN }}
    action: upload
    app_location: src
    api_location: api
    output_location: ""
```

## 📧 Email Configuration

The contact form uses nodemailer for SMTP. Configure in environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `SMTP_HOST` | SMTP server | Yes |
| `SMTP_PORT` | SMTP port (587 or 465) | Yes |
| `SMTP_USER` | Email address | Yes |
| `SMTP_PASS` | Email password/token | Yes |
| `SMTP_FROM` | From email | Yes |
| `ADMIN_EMAIL` | Recipient email | Yes |

**Gmail Setup:**
1. Enable 2-factor authentication
2. Generate 16-character app password
3. Use app password in `SMTP_PASS`

## 🎨 Frontend Structure

- `index.html` - Single Page Application with sections:
  - Navigation
  - Hero
  - About
  - Timeline
  - Services
  - Capabilities
  - Clients
  - Contact Form
  - Footer

- `styles.css` - Responsive design with:
  - Mobile-first approach
  - CSS Grid and Flexbox
  - Animations and transitions
  - Dark/light themes

- `script.js` - Functionality:
  - Mobile menu toggle
  - Smooth scrolling
  - Form validation and submission
  - Animated counters
  - Client logos rendering

## 🔒 Security Best Practices

1. **Never commit `.env` files**
   - Add to `.gitignore`
   - Use Azure Key Vault for secrets

2. **CORS Configuration**
   - Azure Static Web App handles CORS automatically
   - No cross-origin issues for same-domain API calls

3. **Environment Variables**
   - Store sensitive data in Azure configuration
   - Never hardcode API keys

## 📱 Responsive Design

- Desktop: Full layout
- Tablet: Optimized grid layouts
- Mobile: Stacked layouts, hamburger menu

Breakpoints:
- `1024px` - Tablet
- `768px` - Mobile
- `480px` - Small mobile

## 🚦 Performance Optimization

- Static asset caching (31536000 seconds)
- Lazy loading for images
- Minified CSS and JavaScript
- CDN distribution via Azure

## 📚 Additional Resources

- [Azure Static Web Apps Docs](https://docs.microsoft.com/en-us/azure/static-web-apps/)
- [Azure Functions Docs](https://docs.microsoft.com/en-us/azure/azure-functions/)
- [staticwebapp.config.json Reference](https://docs.microsoft.com/en-us/azure/static-web-apps/configuration)

## 📝 License

ISC

## 👥 Support

For issues and questions, contact: info@jaivantengineering.com

---

**Last Updated:** January 2024  
**Version:** 1.0.0
