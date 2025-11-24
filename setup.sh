#!/bin/bash

# Luxury Fitness - Setup Script
echo "🏋️  Setting up Luxury Fitness Application..."
echo ""

# Check if MySQL is running
echo "📊 Checking MySQL..."
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL is not installed. Please install MySQL first."
    exit 1
fi

# Create database and import schema
echo "🗄️  Creating database and schema..."
mysql -u root -p <<EOF
CREATE DATABASE IF NOT EXISTS luxury_fitness;
USE luxury_fitness;
SOURCE $(pwd)/backend/database/schema.sql;
SOURCE $(pwd)/backend/database/sample-data.sql;
EOF

if [ $? -eq 0 ]; then
    echo "✅ Database setup complete!"
else
    echo "❌ Database setup failed. Please check your MySQL credentials."
    exit 1
fi

# Backend setup
echo ""
echo "🔧 Setting up backend..."
cd backend

if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please update backend/.env with your MySQL password"
fi

if [ ! -d node_modules ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

cd ..

# Frontend setup
echo ""
echo "🎨 Setting up frontend..."
cd frontend

if [ ! -d node_modules ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update backend/.env with your MySQL password"
echo "2. Start the backend: cd backend && npm run dev"
echo "3. Start the frontend: cd frontend && npm run dev"
echo ""
echo "🌐 Frontend will run on: http://localhost:5173"
echo "🔌 Backend will run on: http://localhost:5000"
echo ""
echo "👤 Demo credentials:"
echo "   Email: demo@luxuryfitness.com"
echo "   Password: demo123"
echo ""
echo "🎉 Happy coding!"
