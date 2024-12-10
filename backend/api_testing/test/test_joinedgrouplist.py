from httpx import get

BACKEND_URL = "http://backend:5000"


def test_data():
    response = get(f"{BACKEND_URL}/groups/joined_groups/4943369")
    actual = response.json()
    expected = {
        "ownedGroups": [
            {
                "id": 0,
                "name": "CP",
                "description": None,
                "course": "Capstone",
                "isPublic": True,
            }
        ],
        "joinedGroups": [
            {
                "id": 1,
                "name": "CP2",
                "description": None,
                "course": "Capstone",
                "isPublic": True,
            }
        ],
    }
    assert actual==expected

def test_data2():
    response = get(f"{BACKEND_URL}/groups/joined_groups/4943370")
    actual = response.json()
    expected = {
        "ownedGroups": [
            {
                "id": 1,
                "name": "CP2",
                "description": None,
                "course": "Capstone",
                "isPublic": True,
            }
        ],
        "joinedGroups": [
            {
                "id": 0,
                "name": "CP",
                "description": None,
                "course": "Capstone",
                "isPublic": True,
            }
        ],
    }
    assert actual==expected
