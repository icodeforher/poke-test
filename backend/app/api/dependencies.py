"""
API Dependencies
FastAPI dependencies for dependency injection
"""
from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.security import verify_token

security = HTTPBearer()


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    """
    Dependency to get the current authenticated user
    
    Args:
        credentials: HTTP Bearer token from request
        
    Returns:
        Username from the validated token
        
    Raises:
        HTTPException: If token is invalid
    """
    token = credentials.credentials
    return verify_token(token)

