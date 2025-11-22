"""
Authentication Service
Contains business logic for user authentication
"""
from datetime import timedelta
from fastapi import HTTPException, status
from app.core.config import get_settings
from app.core.security import create_access_token
from app.schemas.auth import LoginRequest, LoginResponse

settings = get_settings()


class AuthService:
    """
    Handles authentication business logic
    In a real application, this would check against a database
    """
    
    # Hardcoded credentials as per requirements
    ADMIN_USERNAME = "admin"
    ADMIN_PASSWORD = "admin"
    
    def authenticate_user(self, credentials: LoginRequest) -> LoginResponse:
        """
        Authenticate a user and return a JWT token
        
        Args:
            credentials: Login credentials
            
        Returns:
            LoginResponse with access token
            
        Raises:
            HTTPException: If credentials are invalid
        """
        if (credentials.username != self.ADMIN_USERNAME or 
            credentials.password != self.ADMIN_PASSWORD):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Create access token
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": credentials.username}, 
            expires_delta=access_token_expires
        )
        
        return LoginResponse(
            access_token=access_token,
            token_type="bearer"
        )


# Singleton instance
auth_service = AuthService()

