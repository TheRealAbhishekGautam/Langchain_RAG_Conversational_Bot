# FastAPI RAG Application

A comprehensive FastAPI application for document-based conversational AI using Retrieval Augmented Generation (RAG) pattern.

## Features

- **Document Management**: Upload, list, and delete PDF/DOCX documents
- **Vector Storage**: ChromaDB integration for efficient document retrieval
- **Conversational AI**: Context-aware chat with document-based responses
- **Session Management**: Persistent conversation history using SQLite
- **Comprehensive Logging**: Detailed logging for monitoring and debugging
- **API Documentation**: Auto-generated Swagger/OpenAPI documentation

## Project Structure

```
fastapi_rag_project/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application entry point
│   ├── models/                 # Pydantic models for requests/responses
│   │   ├── __init__.py
│   │   ├── request_models.py
│   │   └── response_models.py
│   ├── services/               # Business logic services
│   │   ├── __init__.py
│   │   ├── document_service.py
│   │   ├── vector_store_service.py
│   │   └── conversation_service.py
│   ├── database/               # Database handlers
│   │   ├── __init__.py
│   │   └── sqlite_handler.py
│   ├── utils/                  # Utility functions
│   │   ├── __init__.py
│   │   ├── logger.py
│   │   └── document_loader.py
│   └── config/                 # Configuration settings
│       ├── __init__.py
│       └── settings.py
├── requirements.txt            # Python dependencies
├── .env                        # Environment variables
└── README.md                  # This file
```

## Installation & Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Create a `.env` file in the project root and add your API keys:

```bash
OPENAI_API_KEY=your_openai_api_key_here
LANGCHAIN_API_KEY=your_langchain_api_key_here
LANGCHAIN_TRACING_V2=true
LANGCHAIN_PROJECT=FastAPI_RAG_Project
```

### 3. Run the Application

```bash
# Method 1: Direct execution
python app/main.py

# Method 2: Using uvicorn
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

### 1. Add Document
- **Endpoint**: `POST /api/documents/add`
- **Description**: Upload and process PDF/DOCX documents
- **Input**: File upload (multipart/form-data)
- **Response**: Document metadata and processing status

### 2. List Documents
- **Endpoint**: `POST /api/documents/list`
- **Description**: Retrieve list of uploaded documents
- **Input**: Pagination parameters (limit, offset)
- **Response**: List of documents with metadata

### 3. Delete Document
- **Endpoint**: `DELETE /api/documents/delete`
- **Description**: Remove document from vector store and database
- **Input**: Document ID
- **Response**: Deletion confirmation

### 4. Conversation
- **Endpoint**: `POST /api/conversation`
- **Description**: Chat with AI using uploaded documents as context
- **Input**: Session ID and question
- **Response**: AI-generated answer with source references

## API Documentation

After starting the application, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Usage Examples

### Python Client Example

```python
import requests
import json

base_url = "http://localhost:8000"

# 1. Upload a document
with open("document.pdf", "rb") as f:
    files = {"file": f}
    response = requests.post(f"{base_url}/api/documents/add", files=files)
    print(response.json())

# 2. List documents
response = requests.post(f"{base_url}/api/documents/list", 
                        json={"limit": 10, "offset": 0})
print(response.json())

# 3. Have a conversation
conversation_data = {
    "session_id": "unique-session-123",
    "question": "What is the main topic of the uploaded document?"
}
response = requests.post(f"{base_url}/api/conversation", 
                        json=conversation_data)
print(response.json())

# 4. Delete a document
delete_data = {"document_id": "document-uuid-here"}
response = requests.delete(f"{base_url}/api/documents/delete", 
                          json=delete_data)
print(response.json())
```

### cURL Examples

```bash
# Upload document
curl -X POST "http://localhost:8000/api/documents/add" \
     -H "accept: application/json" \
     -H "Content-Type: multipart/form-data" \
     -F "file=@document.pdf"

# List documents
curl -X POST "http://localhost:8000/api/documents/list" \
     -H "accept: application/json" \
     -H "Content-Type: application/json" \
     -d '{"limit": 10, "offset": 0}'

# Conversation
curl -X POST "http://localhost:8000/api/conversation" \
     -H "accept: application/json" \
     -H "Content-Type: application/json" \
     -d '{"session_id": "test-session", "question": "What is this document about?"}'
```

## Configuration

### Environment Variables

- `OPENAI_API_KEY`: OpenAI API key for language model
- `LANGCHAIN_API_KEY`: LangChain API key for tracing
- `LANGCHAIN_TRACING_V2`: Enable LangChain tracing (true/false)
- `LANGCHAIN_PROJECT`: Project name for LangChain tracing

### Application Settings

Modify `app/config/settings.py` to customize:

- **Vector Store**: ChromaDB persistence directory and collection name
- **Database**: SQLite database filename
- **Document Processing**: Chunk size, overlap, and similarity search parameters
- **API Configuration**: Title, description, and version

## Features in Detail

### Document Processing
- Supports PDF and DOCX file formats
- Automatic text extraction and chunking
- Metadata preservation for source tracking
- Error handling and cleanup

### Vector Storage
- ChromaDB for persistent vector storage
- OpenAI embeddings for semantic similarity
- Efficient document retrieval and deletion
- Configurable similarity search parameters

### Conversation Management
- Session-based conversation history
- Context-aware response generation
- Source document referencing
- SQLite-based persistence

### Logging
- Comprehensive application logging
- Daily log rotation
- Console and file output
- Structured log formatting

## Troubleshooting

### Common Issues

1. **OpenAI API Key Not Set**
   - Ensure OPENAI_API_KEY is properly configured in .env file

2. **ChromaDB Permission Issues**
   - Check write permissions for the ChromaDB directory
   - Ensure the directory is not read-only

3. **SQLite Database Errors**
   - Verify write permissions in the application directory
   - Check disk space availability

4. **File Upload Errors**
   - Confirm file format is PDF or DOCX
   - Check file size limits and available memory

### Debug Mode

Run with debug logging:

```bash
export PYTHONPATH="${PYTHONPATH}:$(pwd)"
python -m uvicorn app.main:app --reload --log-level debug
```

## Development

### Project Structure Guidelines
- Follow separation of concerns principle
- Use dependency injection for services
- Implement proper error handling
- Maintain comprehensive logging
- Follow FastAPI best practices

### Testing
- Unit tests for individual components
- Integration tests for API endpoints
- End-to-end testing for complete workflows
- Mock external dependencies for testing

## License

This project is provided as-is for educational and development purposes.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement changes with tests
4. Submit a pull request

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review application logs
3. Consult FastAPI and LangChain documentation
4. Open an issue with detailed information
