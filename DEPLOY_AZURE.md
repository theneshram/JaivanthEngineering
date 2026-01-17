# Deploy to Azure Static Web App

## Option 1: Azure Portal (Easiest)

1. **Go to Azure Portal:** https://portal.azure.com
2. **Create Resource** → Search "Static Web App"
3. **Fill in details:**
   - **Resource Group:** Create new or select existing
   - **Name:** `jaivant-engineering`
   - **Region:** Central US (or nearest)
   - **Deployment:** GitHub
   - **GitHub Account:** Authorize and select `theneshram/JaivanthEngineering`
   - **Branch:** `main`
   - **Build Presets:** Custom
   - **App location:** `src`
   - **Api location:** `api`
   - **Output location:** (leave empty)
4. **Review + Create** → **Create**

Azure will automatically:
- Create GitHub Actions workflow
- Deploy your app
- Provide a URL

---

## Option 2: Azure CLI with ARM Template

### Prerequisites
```bash
# Install Azure CLI
# Windows: Download from https://aka.ms/installazurecliwindows
# Or use: winget install -e --id Microsoft.AzureCLI

# Login to Azure
az login
```

### Step 1: Create GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. **Generate new token (classic)**
3. **Select scopes:**
   - `repo` (all)
   - `workflow`
4. **Copy the token** (you'll need it next)

### Step 2: Update Parameters File

Edit `azure-deploy-parameters.json`:
```json
{
  "repositoryToken": {
    "value": "YOUR_ACTUAL_GITHUB_TOKEN_HERE"
  }
}
```

### Step 3: Deploy

```bash
# Set variables
$resourceGroup = "jaivant-engineering-rg"
$location = "centralus"

# Create resource group
az group create --name $resourceGroup --location $location

# Deploy using ARM template
az deployment group create `
  --resource-group $resourceGroup `
  --template-file azure-deploy-template.json `
  --parameters azure-deploy-parameters.json
```

---

## Option 3: Azure CLI Quick Deploy

```bash
# Login
az login

# Create resource group
az group create --name jaivant-engineering-rg --location centralus

# Create Static Web App
az staticwebapp create `
  --name jaivant-engineering `
  --resource-group jaivant-engineering-rg `
  --source https://github.com/theneshram/JaivanthEngineering `
  --branch main `
  --app-location "src" `
  --api-location "api" `
  --output-location "" `
  --login-with-github
```

---

## After Deployment

### 1. Get Your App URL
```bash
az staticwebapp show `
  --name jaivant-engineering `
  --resource-group jaivant-engineering-rg `
  --query "defaultHostname" `
  --output tsv
```

Your site will be: `https://jaivant-engineering.azurestaticapps.net`

### 2. Configure Environment Variables

In Azure Portal:
1. Go to your Static Web App
2. **Settings** → **Configuration**
3. Add application settings:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   SMTP_FROM=noreply@jaivantengineering.com
   ADMIN_EMAIL=admin@jaivantengineering.com
   ```

Or via CLI:
```bash
az staticwebapp appsettings set `
  --name jaivant-engineering `
  --resource-group jaivant-engineering-rg `
  --setting-names `
    SMTP_HOST=smtp.gmail.com `
    SMTP_PORT=587 `
    SMTP_USER=your-email@gmail.com `
    SMTP_PASS=your-app-password `
    SMTP_FROM=noreply@jaivantengineering.com `
    ADMIN_EMAIL=admin@jaivantengineering.com
```

### 3. Monitor Deployment

Check GitHub Actions:
- Go to: https://github.com/theneshram/JaivanthEngineering/actions
- Watch the deployment workflow
- Deployment usually takes 2-5 minutes

---

## Verify Deployment

```bash
# Check status
az staticwebapp show `
  --name jaivant-engineering `
  --resource-group jaivant-engineering-rg `
  --query "defaultHostname"

# Test health endpoint
curl https://jaivant-engineering.azurestaticapps.net/api/health
```

---

## Update Deployment

Any push to `main` branch automatically redeploys:
```bash
git add .
git commit -m "Update website"
git push origin main
```

GitHub Actions will automatically build and deploy!

---

## Troubleshooting

### Deployment fails
- Check GitHub Actions logs
- Verify `src/` and `api/` folders exist
- Ensure `staticwebapp.config.json` is valid

### API returns 500
- Check environment variables are set
- Verify SMTP credentials
- Check Azure Portal → Monitor → Logs

### Website shows 404
- Check `appLocation` is set to `src`
- Verify `index.html` exists in `src/`
- Check build logs in GitHub Actions

---

## Cost Estimate

**Free Tier includes:**
- 100 GB bandwidth/month
- 0.5 GB storage
- Custom domains
- SSL certificates
- GitHub integration

Perfect for this project! 🎉

---

## Next Steps After Deployment

1. ✅ Verify site loads: `https://jaivant-engineering.azurestaticapps.net`
2. ✅ Test contact form with real SMTP credentials
3. ✅ Add custom domain (optional)
4. ✅ Enable monitoring and alerts
5. ✅ Set up staging environments (optional)

---

**Ready to deploy?** Choose one of the options above! 🚀
