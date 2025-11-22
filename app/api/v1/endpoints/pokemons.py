"""
Pokemon Endpoints
Handles pokemon-related operations
"""
from fastapi import APIRouter, Depends, Query
from typing import Any, Dict
from app.api.dependencies import get_current_user
from app.services.pokemon_service import get_pokemon_service, PokemonService

router = APIRouter()


@router.get("/pokemons", tags=["Pokemons"])
async def get_pokemons(
    offset: int = Query(default=0, ge=0, description="Number of pokemons to skip"),
    limit: int = Query(default=20, ge=1, le=100, description="Number of pokemons to return"),
    current_user: str = Depends(get_current_user),
    pokemon_service: PokemonService = Depends(get_pokemon_service)
) -> Dict[str, Any]:
    """
    Get paginated list of all pokemons
    
    Requires authentication.
    
    - **offset**: Number of pokemons to skip (default: 0)
    - **limit**: Number of pokemons to return (default: 20, max: 100)
    
    Returns a paginated list with:
    - count: Total number of pokemons
    - next: URL for next page (if any)
    - previous: URL for previous page (if any)
    - results: List of pokemon names and URLs
    """
    return await pokemon_service.get_pokemons_list(offset=offset, limit=limit)


@router.get("/pokemons/{pokemon_id}", tags=["Pokemons"])
async def get_pokemon_detail(
    pokemon_id: str,
    current_user: str = Depends(get_current_user),
    pokemon_service: PokemonService = Depends(get_pokemon_service)
) -> Dict[str, Any]:
    """
    Get detailed information about a specific pokemon
    
    Requires authentication.
    
    - **pokemon_id**: Pokemon ID (e.g., "25") or name (e.g., "pikachu")
    
    Returns detailed information including:
    - id, name, height, weight
    - abilities, types, sprites
    - stats, moves, and more
    """
    return await pokemon_service.get_pokemon_detail(pokemon_id)

