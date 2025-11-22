# Pokemon API Backend

Backend service built with FastAPI that provides Pokemon information from PokeAPI.

## Quick Start

```bash
# From backend/ directory
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload
```

**Server:** `http://localhost:8000`
**API Docs:** `http://localhost:8000/docs`

## Production URL

**API:** https://poke-test-tj96.onrender.com
**Docs:** https://poke-test-tj96.onrender.com/docs

## Tech Stack

- FastAPI
- Python 3.11
- JWT Authentication
- Clean Architecture
- 93% Test Coverage

For more details, see the main [README.md](../README.md) in the root directory.

