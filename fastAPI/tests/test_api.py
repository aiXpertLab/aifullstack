import pytest
from fastapi import status


class TestAPIEndpoints:
    """Test cases for API endpoints"""

    def test_health_check(self, client):
        """Test health check endpoint"""
        response = client.get("/v1/health")
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == {"status": "healthy"}

    def test_search_endpoint(self, client):
        """Test search endpoint with valid query"""
        test_query = "test query"
        response = client.post("/v1/search", json={"query": test_query})
        assert response.status_code == status.HTTP_200_OK
        assert "scores" in response.json()

    def test_summarize_endpoint(self, client):
        """Test summarize endpoint with valid text"""
        test_text = "This is a test text for summarization."
        response = client.post("/v1/summarize", json={"text": test_text})
        assert response.status_code == status.HTTP_200_OK
        assert "summary" in response.json()


class TestAsyncAPIEndpoints:
    """Test cases for async API endpoints"""

    @pytest.mark.asyncio
    async def test_async_health_check(self, async_client):
        """Test async health check endpoint"""
        response = await async_client.get("/v1/health")
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == {"status": "healthy"}

    @pytest.mark.asyncio
    async def test_async_search_endpoint(self, async_client):
        """Test async search endpoint"""
        test_query = "test query"
        response = await async_client.post("/v1/search", json={"query": test_query})
        assert response.status_code == status.HTTP_200_OK
        assert "scores" in response.json() 