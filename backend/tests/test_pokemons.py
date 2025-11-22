"""
Pokemon Tests
Tests for pokemon-related endpoints

Note: Some tests make real API calls to PokeAPI and may fail if the service is down.
These are integration tests that verify the complete flow.
"""
import pytest
from fastapi import status


class TestPokemonEndpoints:
    """Test suite for pokemon endpoints"""
    
    def test_get_pokemons_without_auth(self, client):
        """Test that pokemons endpoint requires authentication"""
        response = client.get("/pokemons")
        
        assert response.status_code == status.HTTP_403_FORBIDDEN
    
    @pytest.mark.integration
    def test_get_pokemons_with_auth(self, client, auth_headers):
        """
        Test getting pokemon list with valid authentication
        Integration test - makes real API call to PokeAPI
        """
        response = client.get("/pokemons", headers=auth_headers)
        
        # Skip if PokeAPI is down
        if response.status_code == status.HTTP_503_SERVICE_UNAVAILABLE:
            pytest.skip("PokeAPI is currently unavailable")
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        # Check response structure
        assert "count" in data
        assert "results" in data
        assert isinstance(data["results"], list)
        assert len(data["results"]) > 0
        
        # Check first pokemon has correct structure
        first_pokemon = data["results"][0]
        assert "name" in first_pokemon
        assert "url" in first_pokemon
    
    @pytest.mark.integration
    def test_get_pokemons_pagination(self, client, auth_headers):
        """
        Test pokemon list pagination
        Integration test - makes real API call to PokeAPI
        """
        response = client.get(
            "/pokemons",
            params={"offset": 20, "limit": 10},
            headers=auth_headers
        )
        
        # Skip if PokeAPI is down
        if response.status_code == status.HTTP_503_SERVICE_UNAVAILABLE:
            pytest.skip("PokeAPI is currently unavailable")
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert len(data["results"]) == 10
    
    def test_get_pokemon_detail_without_auth(self, client):
        """Test that pokemon detail endpoint requires authentication"""
        response = client.get("/pokemons/1")
        
        assert response.status_code == status.HTTP_403_FORBIDDEN
    
    @pytest.mark.integration
    def test_get_pokemon_detail_by_id(self, client, auth_headers):
        """
        Test getting pokemon detail by ID
        Integration test - makes real API call to PokeAPI
        """
        response = client.get("/pokemons/25", headers=auth_headers)
        
        # Skip if PokeAPI is down
        if response.status_code == status.HTTP_503_SERVICE_UNAVAILABLE:
            pytest.skip("PokeAPI is currently unavailable")
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        # Check basic pokemon data
        assert data["id"] == 25
        assert data["name"] == "pikachu"
        assert "height" in data
        assert "weight" in data
        assert "abilities" in data
        assert "types" in data
    
    @pytest.mark.integration
    def test_get_pokemon_detail_by_name(self, client, auth_headers):
        """
        Test getting pokemon detail by name
        Integration test - makes real API call to PokeAPI
        """
        response = client.get("/pokemons/bulbasaur", headers=auth_headers)
        
        # Skip if PokeAPI is down
        if response.status_code == status.HTTP_503_SERVICE_UNAVAILABLE:
            pytest.skip("PokeAPI is currently unavailable")
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        assert data["id"] == 1
        assert data["name"] == "bulbasaur"
    
    @pytest.mark.integration
    def test_get_nonexistent_pokemon(self, client, auth_headers):
        """
        Test getting a non-existent pokemon
        Integration test - makes real API call to PokeAPI
        """
        response = client.get("/pokemons/99999", headers=auth_headers)
        
        # Skip if PokeAPI is down (503) - we only care about 404 here
        if response.status_code == status.HTTP_503_SERVICE_UNAVAILABLE:
            pytest.skip("PokeAPI is currently unavailable")
        
        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert "not found" in response.json()["detail"].lower()
    
    def test_invalid_token(self, client):
        """Test request with invalid token"""
        response = client.get(
            "/pokemons",
            headers={"Authorization": "Bearer invalid_token"}
        )
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED


class TestRootEndpoints:
    """Test suite for root and health endpoints"""
    
    def test_root_endpoint(self, client):
        """Test root endpoint returns API information"""
        response = client.get("/")
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert "message" in data
        assert "version" in data
        assert "endpoints" in data
    
    def test_health_endpoint(self, client):
        """Test health check endpoint"""
        response = client.get("/health")
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["status"] == "healthy"
        assert "timestamp" in data
        assert "version" in data

