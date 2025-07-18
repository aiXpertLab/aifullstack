# FastAPI Testing Guide

This document explains how to set up and run unit tests for the FastAPI application.

## Setup

### Install Dependencies

First, install the testing dependencies:

```bash
pip install -r requirements.txt
```

### Test Structure

```
tests/
├── __init__.py
├── conftest.py          # Pytest configuration and fixtures
├── test_api.py          # API endpoint tests
├── test_services.py     # Service layer tests
├── test_models.py       # Pydantic model tests
└── test_integration.py  # Integration tests
```

## Running Tests

### Run All Tests

```bash
pytest
```

### Run Tests with Coverage

```bash
pytest --cov=app --cov-report=html
```

This will generate an HTML coverage report in `htmlcov/` directory.

### Run Specific Test Files

```bash
# Run only API tests
pytest tests/test_api.py

# Run only service tests
pytest tests/test_services.py

# Run only model tests
pytest tests/test_models.py
```

### Run Tests by Category

```bash
# Run only unit tests
pytest -m unit

# Run only integration tests
pytest -m integration

# Run only fast tests (exclude slow tests)
pytest -m "not slow"
```

### Run Tests Verbosely

```bash
pytest -v
```

### Run Tests with Output

```bash
pytest -s
```

## Test Categories

### 1. Unit Tests (`test_models.py`, `test_services.py`)

- Test individual functions and classes in isolation
- Use mocks to isolate dependencies
- Fast execution
- Focus on business logic

### 2. API Tests (`test_api.py`)

- Test HTTP endpoints
- Verify request/response formats
- Test error handling
- Use FastAPI TestClient

### 3. Integration Tests (`test_integration.py`)

- Test complete workflows
- Test database interactions
- Test external service integrations
- Slower execution

## Writing Tests

### Test Naming Convention

- Test files: `test_*.py`
- Test classes: `Test*`
- Test methods: `test_*`

### Example Test Structure

```python
import pytest
from fastapi import status

class TestExampleEndpoint:
    """Test cases for example endpoint"""
    
    def test_valid_request(self, client):
        """Test with valid request data"""
        response = client.post("/api/example", json={"data": "test"})
        assert response.status_code == status.HTTP_200_OK
        assert "result" in response.json()
    
    def test_invalid_request(self, client):
        """Test with invalid request data"""
        response = client.post("/api/example", json={"data": ""})
        assert response.status_code == status.HTTP_400_BAD_REQUEST
```

### Using Fixtures

Fixtures are defined in `conftest.py` and can be used across all test files:

```python
def test_with_fixture(client, test_settings):
    """Test using fixtures"""
    response = client.get("/health")
    assert response.status_code == 200
```

### Mocking External Dependencies

```python
from unittest.mock import patch

@patch('app.services.external_service.ExternalAPI')
def test_with_mock(self, mock_external):
    """Test with mocked external service"""
    mock_external.return_value.get_data.return_value = {"test": "data"}
    # Your test code here
```

## Test Configuration

### pytest.ini

The `pytest.ini` file configures:
- Test discovery patterns
- Coverage reporting
- Test markers
- Output formatting

### Coverage Configuration

Coverage reports are generated for:
- Terminal output with missing lines
- HTML report in `htmlcov/`
- XML report for CI/CD integration

## Best Practices

### 1. Test Organization

- Group related tests in classes
- Use descriptive test method names
- Add docstrings to explain test purpose

### 2. Test Data

- Use fixtures for common test data
- Create test-specific data when needed
- Clean up test data after tests

### 3. Assertions

- Use specific assertions
- Test both positive and negative cases
- Verify response structure and content

### 4. Error Handling

- Test error conditions
- Verify appropriate HTTP status codes
- Test validation errors

### 5. Performance

- Mark slow tests with `@pytest.mark.slow`
- Use timeouts for performance tests
- Mock heavy operations in unit tests

## Continuous Integration

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: 3.9
      - name: Install dependencies
        run: pip install -r requirements.txt
      - name: Run tests
        run: pytest --cov=app --cov-report=xml
      - name: Upload coverage
        uses: codecov/codecov-action@v1
```

## Troubleshooting

### Common Issues

1. **Import Errors**: Make sure you're running tests from the project root
2. **Database Connection**: Use test databases or mocks
3. **Model Loading**: Mock heavy ML models in unit tests
4. **Async Tests**: Use `@pytest.mark.asyncio` for async test methods

### Debugging Tests

```bash
# Run with debug output
pytest -s -v --tb=long

# Run single test
pytest tests/test_api.py::TestAPIEndpoints::test_health_check -v

# Run with print statements
pytest -s
``` 