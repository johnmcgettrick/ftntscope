from fastapi import APIRouter

router = APIRouter()

@router.get("/shop")
def get_shop():
    return [
        {
            "id": "skin_001",
            "name": "Galaxy Scout",
            "imageUrl": "https://example.com/galaxy.png",
            "price": 2000,
            "isNew": True,
            "rarity": "legendary"
        },
        {
            "id": "skin_002",
            "name": "Peely",
            "imageUrl": "https://example.com/peely.png",
            "price": 1200,
            "isNew": False,
            "rarity": "rare"
        }
    ]