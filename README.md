# Pokemon Full-Stack Application

A modern full-stack Pokemon application with **type-safe** integration between FastAPI backend and Next.js frontend.

## 🌟 Features

- ✅ **Type Safety Total**: Auto-generated types from OpenAPI
- ✅ **React Query**: Smart caching and server state
- ✅ **Clean Architecture**: Well-organized backend and frontend
- ✅ **Developer Experience**: Perfect autocomplete and error detection
- ✅ **Production Ready**: 93% test coverage, complete documentation

## 📁 Project Structure

```
poke-test/
├── app/              # Next.js app directory (frontend)
├── components/       # React components
├── lib/              # Frontend utilities and hooks
├── public/           # Static assets
├── types/            # TypeScript types
├── backend/          # FastAPI backend API
├── docs/             # Documentation
├── package.json      # Frontend dependencies
└── README.md         # This file
```

## 🚀 Quick Start

### Prerequisites

- Python 3.9+
- Node.js 18+
- npm or yarn

### Installation & Running

**Backend (Terminal 1):**

```bash
# Navigate to backend
cd backend

# Create virtual environment (first time only)
python3 -m venv venv
source venv/bin/activate  # On Mac/Linux

# Install dependencies (first time only)
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload
```

**Frontend (Terminal 2):**

```bash
# From project root
npm install                # First time only
npm run generate:types     # Generate types from backend
npm run dev
```

### Access

- 🌐 **Frontend**: http://localhost:3000
- 🔧 **Backend API**: http://localhost:8000
- 📚 **API Docs**: http://localhost:8000/docs
- 🔐 **Credentials**: `admin` / `admin`

## 🚢 Deployment

- **Frontend**: Deployed on Vercel (root directory)
- **Backend**: Deployed on Render (backend directory)

See `docs/README_DEPLOY.md` for deployment instructions.

## 📚 Documentation

- **[Full Documentation](docs/README.md)** - Complete project documentation
- **[Architecture](docs/ARCHITECTURE.md)** - System architecture and design
- **[Backend Guide](docs/BACKEND.md)** - Backend API documentation
- **[Frontend Guide](docs/FRONTEND.md)** - Frontend implementation details
- **[Type Generation](docs/TYPE_GENERATION.md)** - OpenAPI type generation
- **[Deployment](docs/README_DEPLOY.md)** - Deployment instructions

## 🛠 Tech Stack

**Frontend:**
- Next.js 14
- React Query
- TypeScript
- Tailwind CSS
- Zustand (State Management)

**Backend:**
- FastAPI
- Python 3.9+
- JWT Authentication
- OpenAPI/Swagger

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest --cov=app

# Frontend (add tests as needed)
npm test
```

## 📝 Environment Variables

**Backend** (`backend/.env`):
```env
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
POKEAPI_BASE_URL=https://pokeapi.co/api/v2
```

**Frontend** (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🤝 Contributing

This is a test project for learning purposes.

## 📄 License

MIT License
