"""
Pokemon Service
Contains business logic for pokemon operations
"""
from typing import Dict, Any
from app.infrastructure.pokeapi_client import PokeAPIClient
from app.schemas.pokemon import PokemonListResponse


class PokemonService:
    """
    Handles pokemon-related business logic
    Acts as an intermediary between the API layer and infrastructure layer
    """
    
    def __init__(self, pokeapi_client: PokeAPIClient):
        self.pokeapi_client = pokeapi_client
    
    async def get_pokemons_list(self, offset: int = 0, limit: int = 20) -> Dict[str, Any]:
        """
        Get paginated list of pokemons
        
        Args:
            offset: Number of items to skip
            limit: Number of items to return
            
        Returns:
            Dictionary with paginated pokemon list
        """
        # Business logic can be added here
        # For example: caching, data transformation, validation
        
        # Validate pagination parameters
        if offset < 0:
            offset = 0
        if limit < 1:
            limit = 20
        if limit > 100:
            limit = 100  # Max limit to prevent abuse
        
        return await self.pokeapi_client.get_pokemons(offset=offset, limit=limit)
    
    async def get_pokemon_detail(self, pokemon_id: str) -> Dict[str, Any]:
        """
        Get detailed information about a specific pokemon
        
        Args:
            pokemon_id: Pokemon ID or name
            
        Returns:
            Dictionary with detailed pokemon information
        """
        # Business logic can be added here
        # For example: caching, data enrichment, favorite tracking
        
        return await self.pokeapi_client.get_pokemon_by_id(pokemon_id)


# Factory function for dependency injection
def get_pokemon_service() -> PokemonService:
    from app.infrastructure.pokeapi_client import pokeapi_client
    return PokemonService(pokeapi_client)

