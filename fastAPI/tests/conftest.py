import pytest
import pytest_asyncio
import asyncio
from httpx import AsyncClient
from fastapi.testclient import TestClient

from app.main import create_app
from app.config import Settings


@pytest.fixture
def test_settings():
    """Test settings fixture"""
    return Settings(
        PROJECT_NAME="Test FastAPI App",
        VERSION="1.0.0",
        DESCRIPTION="Test application for unit testing"
    )


@pytest.fixture
def app(test_settings):
    """Create a test FastAPI application"""
    return create_app(test_settings)


@pytest.fixture
def client(app):
    """Create a test client for the FastAPI application"""
    return TestClient(app)


@pytest_asyncio.fixture
async def async_client(app):
    """Create an async test client for the FastAPI application"""
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac


@pytest.fixture(scope="session")
def event_loop():
    """Create an instance of the default event loop for the test session"""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close() 