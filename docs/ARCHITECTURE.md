# Architecture Documentation

## Clean Architecture Implementation

This project follows **Clean Architecture** principles to ensure maintainability, testability, and scalability.

## Project Structure

```
app/
├── __init__.py
├── main.py                         # Application entry point
├── api/                            # 🎯 PRESENTATION LAYER
│   ├── dependencies.py            # FastAPI dependency injection
│   └── v1/
│       └── endpoints/
│           ├── auth.py            # Authentication endpoints
│           └── pokemons.py        # Pokemon endpoints
├── core/                          # ⚙️ CORE LAYER
│   ├── config.py                 # Application settings
│   └── security.py               # JWT & security utilities
├── schemas/                       # 📋 DATA TRANSFER OBJECTS
│   ├── auth.py                   # Authentication DTOs
│   └── pokemon.py                # Pokemon DTOs
├── services/                      # 💼 BUSINESS LOGIC LAYER
│   ├── auth_service.py           # Authentication business logic
│   └── pokemon_service.py        # Pokemon business logic
└── infrastructure/                # 🔌 INFRASTRUCTURE LAYER
    └── pokeapi_client.py         # External API client

tests/                             # 🧪 TESTS
├── conftest.py                   # Pytest configuration & fixtures
├── test_auth.py                  # Authentication tests
└── test_pokemons.py              # Pokemon tests
```

## Layers Explanation

### 1. **Presentation Layer** (`api/`)
- **Responsibility**: Handle HTTP requests and responses
- **Components**: FastAPI routers and endpoints
- **Dependencies**: Services layer
- **Key Files**:
  - `endpoints/auth.py`: Login endpoint
  - `endpoints/pokemons.py`: Pokemon list and detail endpoints
  - `dependencies.py`: Reusable dependencies (authentication)

### 2. **Business Logic Layer** (`services/`)
- **Responsibility**: Implement business rules and use cases
- **Components**: Service classes
- **Dependencies**: Infrastructure layer, Core layer
- **Key Files**:
  - `auth_service.py`: User authentication logic
  - `pokemon_service.py`: Pokemon operations (with validation, caching potential)

### 3. **Infrastructure Layer** (`infrastructure/`)
- **Responsibility**: Communicate with external services
- **Components**: API clients, database adapters
- **Dependencies**: Core layer
- **Key Files**:
  - `pokeapi_client.py`: HTTP client for PokeAPI

### 4. **Core Layer** (`core/`)
- **Responsibility**: Configuration and shared utilities
- **Components**: Settings, security utilities
- **Dependencies**: None (pure logic)
- **Key Files**:
  - `config.py`: Environment variables and settings
  - `security.py`: JWT token creation and validation

### 5. **Schemas** (`schemas/`)
- **Responsibility**: Define data structures (DTOs)
- **Components**: Pydantic models
- **Dependencies**: None
- **Key Files**:
  - `auth.py`: Login request/response models
  - `pokemon.py`: Pokemon data models

## Dependency Flow

```
┌─────────────────────────────────────────────┐
│                  API Layer                  │
│         (endpoints/auth.py, etc.)           │
└──────────────────┬──────────────────────────┘
                   │ depends on
                   ↓
┌─────────────────────────────────────────────┐
│             Services Layer                  │
│    (auth_service.py, pokemon_service.py)    │
└──────────────────┬──────────────────────────┘
                   │ depends on
                   ↓
┌─────────────────────────────────────────────┐
│          Infrastructure Layer               │
│          (pokeapi_client.py)                │
└─────────────────────────────────────────────┘

         All layers can use Core & Schemas
                   ↓
    ┌──────────────────────────────────┐
    │    Core (config.py, security.py) │
    │    Schemas (auth.py, pokemon.py) │
    └──────────────────────────────────┘
```

## Key Principles Applied

### 1. **Separation of Concerns**
- Each layer has a single, well-defined responsibility
- Changes in one layer don't affect others
- Example: Switching from PokeAPI to a database only requires changing `infrastructure/`

### 2. **Dependency Inversion**
- High-level modules don't depend on low-level modules
- Both depend on abstractions (interfaces/protocols)
- Example: Services depend on abstract client interfaces, not concrete implementations

### 3. **Testability**
- Each layer can be tested independently
- Easy to mock dependencies
- Example: Services can be tested without calling real PokeAPI

### 4. **Single Responsibility Principle**
- Each class/module has one reason to change
- Example: `auth_service.py` only handles authentication logic

### 5. **Open/Closed Principle**
- Open for extension, closed for modification
- Example: Adding new endpoints doesn't require changing existing ones

## Testing Strategy

### Unit Tests
- Test individual components in isolation
- Mock external dependencies
- Focus on business logic in services

### Integration Tests
- Test complete request/response flow
- Use TestClient to simulate HTTP requests
- Verify layer interactions

### Test Coverage
- Minimum 80% code coverage
- All critical paths tested
- Edge cases and error handling covered

## Running Tests

```bash
# Run all tests
pytest

# Run with coverage report
pytest --cov=app --cov-report=html

# Run specific test file
pytest tests/test_auth.py

# Run specific test
pytest tests/test_auth.py::TestAuthentication::test_successful_login
```

## Benefits of This Architecture

1. **Maintainability**: Easy to understand and modify
2. **Scalability**: Can grow without becoming complex
3. **Testability**: High test coverage achievable
4. **Flexibility**: Easy to swap implementations
5. **Team Collaboration**: Clear boundaries for parallel development
6. **Production Ready**: Follows industry best practices

