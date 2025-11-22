"""
Pytest Configuration and Fixtures
Shared test configuration and reusable fixtures
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services.auth_service import auth_service


@pytest.fixture
def client():
    """
    Create a test client for the FastAPI application
    """
    return TestClient(app)


@pytest.fixture
def auth_token(client):
    """
    Get a valid authentication token for testing protected endpoints
    """
    response = client.post(
        "/login",
        json={"username": "admin", "password": "admin"}
    )
    return response.json()["access_token"]


@pytest.fixture
def auth_headers(auth_token):
    """
    Get headers with authentication token
    """
    return {"Authorization": f"Bearer {auth_token}"}

