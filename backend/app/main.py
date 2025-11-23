"""
Main Application Entry Point
Clean Architecture FastAPI application
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

from app.core.config import get_settings
from app.api.v1.endpoints import auth, pokemons

settings = get_settings()

# API metadata
description = """
## Pokemon API Backend 🎮

A modern, scalable backend service built with **Clean Architecture** principles.

### Features

* **JWT Authentication** 🔐 - Secure token-based authentication
* **Pokemon List** 📋 - Get paginated list of all pokemons
* **Pokemon Details** 🔍 - Get detailed information about any pokemon
* **Clean Architecture** 🏗️ - Maintainable and scalable codebase
* **Async/Await** ⚡ - High performance with async operations

### Authentication

All pokemon endpoints require authentication. Use the `/login` endpoint with credentials:
- **Username**: `admin`
- **Password**: `admin`

You'll receive a JWT token that expires after 30 minutes.

### Data Source

All pokemon data is fetched from [PokeAPI](https://pokeapi.co/), the most complete pokemon API available.

### Architecture

This API follows Clean Architecture principles with clear separation of:
- **Presentation Layer** (API endpoints)
- **Business Logic Layer** (Services)
- **Infrastructure Layer** (External API clients)
- **Core Layer** (Configuration & Security)
"""

tags_metadata = [
    {
        "name": "Authentication",
        "description": "Operations for user authentication and JWT token management.",
    },
    {
        "name": "Pokemons",
        "description": "Operations to retrieve pokemon information. **Authentication required**.",
    },
    {
        "name": "Root",
        "description": "Root endpoint with API information.",
    },
    {
        "name": "Health",
        "description": "Health check endpoint for monitoring.",
    },
]

# Initialize FastAPI application
app = FastAPI(
    title=settings.APP_NAME,
    description=description,
    version=settings.APP_VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_tags=tags_metadata,
    contact={
        "name": "API Support",
        "email": "support@example.com",
    },
    license_info={
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT",
    },
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="", tags=["Authentication"])
app.include_router(pokemons.router, prefix="", tags=["Pokemons"])


@app.get("/", tags=["Root"])
async def root():
    """
    Root endpoint - API information
    """
    return {
        "message": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running",
        "endpoints": {
            "documentation": "/docs",
            "login": "/login",
            "pokemons": "/pokemons",
            "pokemon_detail": "/pokemons/{id}"
        }
    }


@app.get("/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint for deployment monitoring
    """
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": settings.APP_VERSION
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )

