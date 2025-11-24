# AI Prompts Used

These are the prompts I used while working with AI assistance (Cursor/Claude).

---

## Initial Prompt

```
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
```

---

## Follow-up Prompts

```
I see the SECRET_KEY is hardcoded. That's not secure. Can you move all secrets
to environment variables? I want to follow best practices for this assessment.
```

```
Everything is in one file, that's not scalable. The assessment will evaluate
architecture. Can you restructure this following Clean Architecture with proper
layers? They mentioned separation of concerns specifically.
```

```
Can you add comprehensive tests? The requirements mention TDD is preferable.
I need good coverage to show I understand testing practices.
```

```
For this project only, I need to use a different git config:
- Name: diego.monroy
- Email: diego.monroy.swe@gmail.com

Can you set this up as local config only?
```

```
The build is failing on Render with some Rust compilation errors for pydantic.
It's using Python 3.13. Can you fix the dependencies to work properly?
```

```
I'm adding a frontend in another chat. Can you help me convert this to a
monorepo? I want:
- Everything in a backend/ folder
- Frontend will go in frontend/ folder
- Update Render configuration accordingly
```

```
My frontend will be deployed on Vercel. Can you configure CORS properly to
allow requests from Vercel domains and localhost during development?
```

---

Deployment: https://poke-test-tj96.onrender.com
