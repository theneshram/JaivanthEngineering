#!/bin/bash
# Install and run the consolidated project locally

set -e

echo "🔧 Installing dependencies..."
npm install

echo "📦 Installing API dependencies..."
cd api
npm install
cd ..

echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Create api/local.settings.json with your SMTP credentials"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
echo "Frontend: http://localhost:3000"
echo "API: http://localhost:7071/api"
