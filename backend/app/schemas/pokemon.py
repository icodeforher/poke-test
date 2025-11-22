"""
Pokemon Schemas (DTOs)
Defines the structure of Pokemon-related data
"""
from pydantic import BaseModel
from typing import Optional, Any


class PokemonListItem(BaseModel):
    """Single pokemon in the list"""
    name: str
    url: str


class PokemonListResponse(BaseModel):
    """Paginated list of pokemons"""
    count: int
    next: Optional[str] = None
    previous: Optional[str] = None
    results: list[PokemonListItem]


class PokemonDetail(BaseModel):
    """
    Detailed pokemon information
    This is a pass-through from PokeAPI, so we use Any for flexibility
    """
    id: int
    name: str
    height: int
    weight: int
    abilities: list[Any]
    types: list[Any]
    sprites: dict[str, Any]
    stats: list[Any]
    
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "id": 25,
                    "name": "pikachu",
                    "height": 4,
                    "weight": 60,
                    "abilities": [],
                    "types": [],
                    "sprites": {},
                    "stats": []
                }
            ]
        }
    }

