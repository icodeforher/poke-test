"""
PokeAPI Client
Handles all communication with the external PokeAPI service
This layer can be easily mocked for testing
"""
import httpx
from typing import Any, Dict
from fastapi import HTTPException, status
from app.core.config import get_settings

settings = get_settings()


class PokeAPIClient:
    """
    Client for interacting with PokeAPI
    Encapsulates all HTTP communication with the external service
    """
    
    def __init__(self):
        self.base_url = settings.POKEAPI_BASE_URL
        self.timeout = settings.POKEAPI_TIMEOUT
    
    async def get_pokemons(self, offset: int = 0, limit: int = 20) -> Dict[str, Any]:
        """
        Fetch paginated list of pokemons
        
        Args:
            offset: Number of items to skip
            limit: Number of items to return
            
        Returns:
            Dictionary with pokemon list data
            
        Raises:
            HTTPException: If the external API fails
        """
        async with httpx.AsyncClient(timeout=self.timeout) as client:
            try:
                response = await client.get(
                    f"{self.base_url}/pokemon",
                    params={"offset": offset, "limit": limit}
                )
                response.raise_for_status()
                return response.json()
            except httpx.TimeoutException:
                raise HTTPException(
                    status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                    detail="PokeAPI request timed out"
                )
            except httpx.HTTPError as e:
                raise HTTPException(
                    status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                    detail=f"Error fetching data from PokeAPI: {str(e)}"
                )
    
    async def get_pokemon_by_id(self, pokemon_id: str) -> Dict[str, Any]:
        """
        Fetch detailed information about a specific pokemon
        
        Args:
            pokemon_id: Pokemon ID or name
            
        Returns:
            Dictionary with detailed pokemon data
            
        Raises:
            HTTPException: If pokemon not found or API fails
        """
        async with httpx.AsyncClient(timeout=self.timeout) as client:
            try:
                response = await client.get(
                    f"{self.base_url}/pokemon/{pokemon_id.lower()}"
                )
                
                if response.status_code == 404:
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"Pokemon '{pokemon_id}' not found"
                    )
                
                response.raise_for_status()
                return response.json()
                
            except httpx.TimeoutException:
                raise HTTPException(
                    status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                    detail="PokeAPI request timed out"
                )
            except httpx.HTTPStatusError as e:
                if e.response.status_code == 404:
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"Pokemon '{pokemon_id}' not found"
                    )
                raise HTTPException(
                    status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                    detail=f"Error fetching data from PokeAPI: {str(e)}"
                )
            except httpx.HTTPError as e:
                raise HTTPException(
                    status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                    detail=f"Error fetching data from PokeAPI: {str(e)}"
                )


# Singleton instance for dependency injection
pokeapi_client = PokeAPIClient()

