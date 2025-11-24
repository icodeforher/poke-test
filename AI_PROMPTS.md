# AI Development Notes

Notes on prompts and iterations used during development with AI assistance.

---

## Initial Request

I need help building a backend API for a technical assessment. Here are the requirements:

BACKEND:
- Framework: FastAPI (Python)
- Must have 3 endpoints:
  1. POST /login - authentication with admin/admin credentials
  2. GET /pokemons - paginated list of pokemons
  3. GET /pokemons/{id} - detailed pokemon information
- Use https://pokeapi.co/ as the data source
- JWT authentication required for pokemon endpoints
- Need good test coverage (at least 80%)
- Should be deployable to production (Render)

ARCHITECTURE:
- Want to use Clean Architecture principles
- Separation of concerns is important for the evaluation
- Need it to be maintainable and scalable

Can you help me implement this step by step? Start with the basic structure.

---

## Changes and Iterations

### Security fix
I saw the SECRET_KEY was hardcoded in the code. That's not secure. 
Asked to move all secrets to environment variables. 
Result: Now using .env file with pydantic-settings

### Architecture refactor
Everything was in one main.py file. Not good for an architecture evaluation.
Asked to restructure following Clean Architecture with proper separation.
Result: Split into api/, services/, infrastructure/, core/, schemas/ folders

### Testing
The requirements mention TDD is preferable and need at least 80% coverage.
Asked to add comprehensive tests.
Result: Test suite with 93% coverage

### Git config
Needed different git config for this project only:
- diego.monroy
- diego.monroy.swe@gmail.com
Set up local git config (not global)

### Deployment problems
Build kept failing on Render with Rust compilation errors.
Problem was Python 3.13 and pydantic compatibility.
Fixed by updating dependencies and forcing Python 3.11.9

### Monorepo conversion
Adding frontend in separate folder.
Asked to convert to monorepo structure:
- backend/ folder for all API code
- frontend/ folder for Next.js app
Updated Render config to point to backend/ as root directory

### CORS setup
Frontend will be on Vercel.
Asked to configure CORS to allow Vercel domains + localhost.
Now supports comma-separated origins in env variable.

---

## Key Decisions

Architecture:
- Used Clean Architecture for separation of concerns
- 5 layers: API, Services, Infrastructure, Core, Schemas
- Makes it easier to test and maintain

Testing:
- Pytest for testing
- 93% coverage (requirement was 80%+)
- Mix of unit and integration tests
- Tests can run without external API (skip if down)

Deployment:
- Chose Render (has free tier)
- Auto-deploys from GitHub
- Environment variables for secrets
- Health check endpoint for monitoring

Tech Stack:
- FastAPI for the API
- Pydantic for data validation
- JWT for authentication
- PokeAPI as data source
- pytest for testing

---

## Requirements Checklist

Backend:
- FastAPI - done
- Login endpoint (POST /login) - done
- Pokemon list (GET /pokemons) - done with pagination
- Pokemon detail (GET /pokemons/id) - done
- JWT authentication - done (admin/admin)
- Clean Architecture - done (5 layers)
- Test coverage 80%+ - done (93%)
- Production deployment - done (Render)

Documentation:
- OpenAPI/Swagger auto-generated at /docs
- README with setup instructions
- Architecture documentation

---

## Deployment Info

Production: https://poke-test-tj96.onrender.com
Docs: https://poke-test-tj96.onrender.com/docs
Repo: https://github.com/icodeforher/poke-test

---

## Notes

Used AI (Cursor with Claude) as coding assistant to help implement and optimize.
Made all architectural decisions myself.
AI helped with:
- Boilerplate code
- Following FastAPI best practices
- Test structure
- Deployment configuration

Did myself:
- Architecture design
- Endpoint structure
- Decision on layers
- CORS configuration
- Monorepo setup
