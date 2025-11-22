"""
Authentication Schemas (DTOs)
Defines the structure of authentication requests and responses
"""
from pydantic import BaseModel, Field


class LoginRequest(BaseModel):
    """Request body for login endpoint"""
    username: str = Field(..., min_length=1, description="Username")
    password: str = Field(..., min_length=1, description="Password")
    
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "username": "admin",
                    "password": "admin"
                }
            ]
        }
    }


class LoginResponse(BaseModel):
    """Response body for successful login"""
    access_token: str = Field(..., description="JWT access token")
    token_type: str = Field(default="bearer", description="Token type")

