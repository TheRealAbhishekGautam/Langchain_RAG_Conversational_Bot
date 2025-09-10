import uuid
from datetime import datetime
from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.responses import JSONResponse
from typing import List
from app.config.settings import settings
from fastapi.middleware.cors import CORSMiddleware
from app.models.request_models import ConversationRequest, DeleteDocumentRequest, DocumentListRequest
from app.models.response_models import (
    AddDocumentResponse, DocumentListResponse, 
    DeleteDocumentResponse, ConversationResponse, ErrorResponse
)
from app.services.document_service import DocumentService
from app.services.conversation_service import ConversationService
from app.utils.logger import setup_logger

# Initialize logger
logger = setup_logger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title=settings.api_title,
    description=settings.api_description,
    version=settings.api_version
)

# CORS configuration (added for Angular frontend)
allowed_origins = [
    "http://localhost:4200",  # Angular dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
document_service = DocumentService()
conversation_service = ConversationService()

@app.on_event("startup")
async def startup_event():
    """Startup event handler"""
    logger.info("FastAPI RAG Application started")

@app.on_event("shutdown")
async def shutdown_event():
    """Shutdown event handler"""
    logger.info("FastAPI RAG Application stopped")

@app.get("/", tags=["Health Check"])
async def root():
    """Root endpoint for health check"""
    return {
        "message": "RAG FastAPI Application is running",
        "version": settings.api_version,
        "timestamp": datetime.now().isoformat()
    }

@app.post("/api/documents/add", response_model=AddDocumentResponse, tags=["Documents"])
async def add_new_document(file: UploadFile = File(...)):
    """
    Add a new document to the vector store

    - **file**: Document file (PDF or DOCX)
    """
    try:
        logger.info(f"Received request to add document: {file.filename}")

        # Validate file type
        if not file.filename.lower().endswith(('.pdf', '.docx')):
            raise HTTPException(
                status_code=400,
                detail="Only PDF and DOCX files are supported"
            )

        # Process document
        result = await document_service.add_document(file)

        if result['success']:
            return AddDocumentResponse(**result)
        else:
            raise HTTPException(status_code=500, detail=result['message'])

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error adding document: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.post("/api/documents/list", response_model=DocumentListResponse, tags=["Documents"])
async def get_document_list(request: DocumentListRequest = DocumentListRequest()):
    """
    Get list of documents in the vector store

    - **limit**: Number of documents to return (default: 10, max: 100)
    - **offset**: Number of documents to skip (default: 0)
    """
    try:
        logger.info(f"Received request to get document list (limit: {request.limit}, offset: {request.offset})")

        result = document_service.get_document_list(request.limit, request.offset)
        return DocumentListResponse(**result)

    except Exception as e:
        logger.error(f"Error retrieving document list: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.delete("/api/documents/delete", response_model=DeleteDocumentResponse, tags=["Documents"])
async def delete_document(request: DeleteDocumentRequest):
    """
    Delete a document from the vector store

    - **document_id**: Unique identifier of the document to delete
    """
    try:
        logger.info(f"Received request to delete document: {request.document_id}")

        result = document_service.delete_document(request.document_id)

        if result['success']:
            return DeleteDocumentResponse(**result)
        else:
            raise HTTPException(status_code=404, detail=result['message'])

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting document: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.post("/api/conversation", response_model=ConversationResponse, tags=["Conversation"])
async def conversation(request: ConversationRequest):
    """
    Have a conversation with the AI based on uploaded documents

    - **session_id**: Unique session identifier for conversation continuity
    - **question**: User's question
    """
    try:
        logger.info(f"Received conversation request for session: {request.session_id}")

        result = conversation_service.get_response(request.session_id, request.question)

        response_data = {
            'success': True,
            'message': 'Response generated successfully',
            'session_id': result['session_id'],  # Use the session_id from the result which might be newly generated
            'question': request.question,
            'answer': result['answer'],
            'sources': result['sources'],
            'response_timestamp': datetime.now()
        }

        return ConversationResponse(**response_data)

    except Exception as e:
        logger.error(f"Error in conversation: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler"""
    logger.error(f"Unhandled exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content=ErrorResponse(
            success=False,
            message="Internal server error",
            error_code="INTERNAL_ERROR",
            error_details={"error": str(exc)}
        ).dict()
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )

## uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
## .venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000