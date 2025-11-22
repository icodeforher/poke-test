#!/bin/bash

# Script to start both backend and frontend in development mode

echo "🚀 Starting Pokemon Full-Stack App"
echo "=================================="
echo ""

# Check if backend is ready
if [ ! -d "venv" ]; then
    echo "❌ Backend venv not found. Please run: python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt"
    exit 1
fi

# Check if frontend dependencies are installed
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
fi

# Check if frontend .env.local exists
if [ ! -f "frontend/.env.local" ]; then
    echo "📝 Creating frontend .env.local..."
    echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > frontend/.env.local
fi

# Start backend
echo "🐍 Starting Backend (FastAPI) on http://localhost:8000"
source venv/bin/activate
uvicorn app.main:app --reload --port 8000 &
BACKEND_PID=$!

# Wait for backend to be ready
sleep 3

# Start frontend
echo "⚛️  Starting Frontend (Next.js) on http://localhost:3000"
cd frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers are starting..."
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "🔐 Login credentials: admin / admin"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait

