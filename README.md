# Pokemon Full-Stack Application

A modern full-stack Pokemon application with FastAPI backend and Next.js frontend.

## 📁 Project Structure

This is a monorepo containing:
- **Backend**: FastAPI REST API with JWT authentication
- **Frontend**: Next.js 14 app with TypeScript and Tailwind CSS

---

# Backend API

Backend service built with FastAPI that provides Pokemon information from PokeAPI.

## Features

- 🏗️ **Clean Architecture**: Separation of concerns, maintainable and scalable
- 🔐 **JWT Authentication**: Secure token-based authentication
- 📄 **Paginated API**: Efficient data fetching with pagination
- 🔍 **Pokemon Details**: Comprehensive pokemon information
- 🧪 **Test Coverage**: 93% coverage with pytest
- 🚀 **Async/Await**: High performance with async operations
- 📝 **OpenAPI Documentation**: Interactive Swagger UI + ReDoc
- 🔧 **Environment Config**: 12-factor app methodology
- 🐳 **Docker Ready**: Containerized for easy deployment

## Architecture

This project follows **Clean Architecture** principles:

```
app/
├── api/              # 🎯 Presentation Layer (FastAPI endpoints)
├── services/         # 💼 Business Logic Layer
├── infrastructure/   # 🔌 External Services (PokeAPI client)
├── core/            # ⚙️ Configuration & Security
└── schemas/         # 📋 Data Transfer Objects (DTOs)
```

## Quick Start

### Setup

```bash
# 1. Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Mac/Linux

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run the server
uvicorn app.main:app --reload
```

**Server will start at:** `http://localhost:8000`

### API Documentation

Once running, access the interactive documentation:

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## API Endpoints

### 1. Login

**POST** `/login`

Authenticate with admin credentials.

**Request Body:**

```json
{
  "username": "admin",
  "password": "admin"
}
```

**Response:**

```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer"
}
```

### 2. Get Pokemons (Paginated)

**GET** `/pokemons?offset=0&limit=20`

Get a paginated list of all pokemons.

**Headers:**

```
Authorization: Bearer <your_token>
```

**Query Parameters:**

- `offset`: Number of pokemons to skip (default: 0)
- `limit`: Number of pokemons to return (default: 20)

**Response:**

```json
{
  "count": 1302,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  "previous": null,
  "results": [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    ...
  ]
}
```

### 3. Get Pokemon Detail

**GET** `/pokemons/{id}`

Get detailed information about a specific pokemon.

**Headers:**

```
Authorization: Bearer <your_token>
```

**Path Parameters:**

- `id`: Pokemon ID or name (e.g., "1" or "pikachu")

**Response:**

```json
{
  "id": 25,
  "name": "pikachu",
  "height": 4,
  "weight": 60,
  "abilities": [...],
  "types": [...],
  "sprites": {...},
  ...
}
```

## API Documentation

Once the server is running, visit:

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## Testing the API

### Using curl

1. **Login:**

```bash
curl -X POST "http://localhost:8000/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin"}'
```

2. **Get Pokemons:**

```bash
TOKEN="your_token_here"
curl -X GET "http://localhost:8000/pokemons?offset=0&limit=20" \
  -H "Authorization: Bearer $TOKEN"
```

3. **Get Pokemon Detail:**

```bash
curl -X GET "http://localhost:8000/pokemons/pikachu" \
  -H "Authorization: Bearer $TOKEN"
```

## Deployment

### Render (Recommended)

The project includes `render.yaml` for one-click deployment:

1. Push to GitHub
2. Connect repository to [Render](https://render.com)
3. Render auto-configures from `render.yaml`

### Docker

```bash
docker-compose up -d
```

### Environment Variables

Required for production:

```bash
SECRET_KEY=<generate-secure-key>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
POKEAPI_BASE_URL=https://pokeapi.co/api/v2
```

Generate secure key:

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

## Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html
```

**Test Coverage:** 93% (14/15 tests passing)

Coverage includes:

- Authentication flows
- Pokemon endpoints
- Error handling
- Security validation

## Development

### Project Structure

```
poke-test/
├── app/
│   ├── api/                    # API endpoints (presentation layer)
│   │   ├── v1/endpoints/
│   │   │   ├── auth.py        # Login endpoint
│   │   │   └── pokemons.py    # Pokemon endpoints
│   │   └── dependencies.py    # FastAPI dependencies
│   ├── core/                  # Core configuration
│   │   ├── config.py         # Settings & environment vars
│   │   └── security.py       # JWT & authentication
│   ├── schemas/              # Pydantic models (DTOs)
│   │   ├── auth.py
│   │   └── pokemon.py
│   ├── services/             # Business logic layer
│   │   ├── auth_service.py
│   │   └── pokemon_service.py
│   ├── infrastructure/       # External services
│   │   └── pokeapi_client.py
│   └── main.py              # Application entry point
├── tests/                    # Test suite
│   ├── conftest.py          # Pytest fixtures
│   ├── test_auth.py
│   └── test_pokemons.py
├── .env                     # Environment variables (not in git)
├── requirements.txt         # Python dependencies
├── pytest.ini              # Pytest configuration
├── ARCHITECTURE.md         # Detailed architecture docs
└── README.md              # This file
```

## Tech Stack

- **FastAPI**: Modern, fast web framework for building APIs
- **Uvicorn**: ASGI server
- **httpx**: Async HTTP client for calling PokeAPI
- **python-jose**: JWT token creation and validation
- **passlib**: Password hashing utilities

## Notes

- Authentication uses JWT tokens that expire after 30 minutes
- The SECRET_KEY should be changed in production
- CORS is configured to allow all origins (should be restricted in production)
- No database is required as all data comes from PokeAPI
