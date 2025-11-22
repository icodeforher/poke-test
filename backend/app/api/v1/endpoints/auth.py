"""
Authentication Endpoints
Handles login and authentication
"""
from fastapi import APIRouter
from app.schemas.auth import LoginRequest, LoginResponse
from app.services.auth_service import auth_service

router = APIRouter()


@router.post("/login", response_model=LoginResponse, tags=["Authentication"])
async def login(credentials: LoginRequest) -> LoginResponse:
    """
    Login endpoint
    
    Authenticates user with admin/admin credentials and returns a JWT token.
    
    - **username**: Must be "admin"
    - **password**: Must be "admin"
    
    Returns a JWT token valid for 30 minutes.
    """
    return auth_service.authenticate_user(credentials)

