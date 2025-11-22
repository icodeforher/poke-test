"""
Authentication Tests
Tests for login and authentication functionality
"""
import pytest
from fastapi import status


class TestAuthentication:
    """Test suite for authentication endpoints"""
    
    def test_successful_login(self, client):
        """Test successful login with correct credentials"""
        response = client.post(
            "/login",
            json={"username": "admin", "password": "admin"}
        )
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"
        assert len(data["access_token"]) > 0
    
    def test_invalid_username(self, client):
        """Test login fails with incorrect username"""
        response = client.post(
            "/login",
            json={"username": "wrong", "password": "admin"}
        )
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
        assert "Incorrect username or password" in response.json()["detail"]
    
    def test_invalid_password(self, client):
        """Test login fails with incorrect password"""
        response = client.post(
            "/login",
            json={"username": "admin", "password": "wrong"}
        )
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
        assert "Incorrect username or password" in response.json()["detail"]
    
    def test_missing_credentials(self, client):
        """Test login fails with missing credentials"""
        response = client.post("/login", json={})
        
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    
    def test_token_format(self, client, auth_token):
        """Test that the token has correct format"""
        assert isinstance(auth_token, str)
        # JWT tokens have 3 parts separated by dots
        assert len(auth_token.split(".")) == 3

