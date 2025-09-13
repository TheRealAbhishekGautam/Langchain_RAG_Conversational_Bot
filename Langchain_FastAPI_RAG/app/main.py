import uuid
from datetime import datetime
from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.responses import JSONResponse
from typing import List
from app.config.settings import settings
from fastapi.middleware.cors import CORSMiddleware
from app.models.request_models import ConversationRequest, DeleteDocumentRequest, DocumentListRequest, UserRegistrationRequest, UserLoginRequest, ForgotPasswordRequest, ResetPasswordRequest
from app.models.response_models import (
    AddDocumentResponse, DocumentListResponse, 
    DeleteDocumentResponse, ConversationResponse, ErrorResponse,
    UserRegistrationResponse, UserLoginResponse, ForgotPasswordResponse, ResetPasswordResponse
)
from app.services.document_service import DocumentService
from app.services.conversation_service import ConversationService
from app.services.user_service import UserService
from app.auth import get_current_user_id
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
user_service = UserService()

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

@app.post("/api/auth/register", response_model=UserRegistrationResponse, tags=["Authentication"])
async def register_user(request: UserRegistrationRequest):
    """
    Register a new user

    - **username**: Unique username (3-50 characters)
    - **email**: Valid email address
    - **password**: Password (minimum 8 characters)
    """
    try:
        logger.info(f"Received registration request for username: {request.username}")

        result = user_service.register_user(request.username, request.email, request.password)

        if result['success']:
            return UserRegistrationResponse(**result)
        else:
            raise HTTPException(status_code=400, detail=result['message'])

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error during registration: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.post("/api/auth/login", response_model=UserLoginResponse, tags=["Authentication"])
async def login_user(request: UserLoginRequest):
    """
    Login user and get access token

    - **username**: Username
    - **password**: Password
    """
    try:
        logger.info(f"Received login request for username: {request.username}")

        result = user_service.authenticate_user(request.username, request.password)

        if result['success']:
            return UserLoginResponse(**result)
        else:
            raise HTTPException(status_code=401, detail=result['message'])

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error during login: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.post("/api/auth/forgot-password", response_model=ForgotPasswordResponse, tags=["Authentication"])
async def forgot_password(request: ForgotPasswordRequest):
    """
    Send password reset email

    - **email**: Email address for password reset
    """
    try:
        logger.info(f"Received forgot password request for email: {request.email}")

        # Create reset token (returns None if email doesn't exist, but we don't reveal this)
        reset_token = user_service.create_reset_token(request.email)
        
        # Always return success to avoid email enumeration
        # In a real app, you would send an email with the reset_token here
        logger.info(f"Password reset token created (if email exists): {request.email}")
        
        return ForgotPasswordResponse(
            success=True,
            message="If this email exists in our system, a password reset link has been sent."
        )

    except Exception as e:
        logger.error(f"Unexpected error during forgot password: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.post("/api/auth/reset-password", response_model=ResetPasswordResponse, tags=["Authentication"])
async def reset_password(request: ResetPasswordRequest):
    """
    Reset password using reset token

    - **token**: Password reset token
    - **new_password**: New password (minimum 8 characters)
    """
    try:
        logger.info(f"Received password reset request")

        result = user_service.reset_password(request.token, request.new_password)

        if result['success']:
            return ResetPasswordResponse(**result)
        else:
            raise HTTPException(status_code=400, detail=result['message'])

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error during password reset: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.post("/api/documents/add", response_model=AddDocumentResponse, tags=["Documents"])
async def add_new_document(
    file: UploadFile = File(...),
    current_user_id: int = Depends(get_current_user_id)
):
    """
    Add a new document to the vector store

    - **file**: Document file (PDF or DOCX)
    - Requires authentication
    """
    try:
        logger.info(f"Received request to add document: {file.filename} for user: {current_user_id}")

        # Validate file type
        if not file.filename.lower().endswith(('.pdf', '.docx')):
            raise HTTPException(
                status_code=400,
                detail="Only PDF and DOCX files are supported"
            )

        # Process document
        result = await document_service.add_document(file, current_user_id)

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
async def get_document_list(
    request: DocumentListRequest,
    current_user_id: int = Depends(get_current_user_id)
):
    """
    Get list of documents in the vector store

    - **limit**: Number of documents to return (default: 10, max: 100)
    - **offset**: Number of documents to skip (default: 0)
    - Requires authentication
    """
    try:
        logger.info(f"Received request to get document list (limit: {request.limit}, offset: {request.offset}) for user: {current_user_id}")

        result = document_service.get_document_list(current_user_id, request.limit, request.offset)
        return DocumentListResponse(**result)

    except Exception as e:
        logger.error(f"Error retrieving document list: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.delete("/api/documents/delete", response_model=DeleteDocumentResponse, tags=["Documents"])
async def delete_document(
    request: DeleteDocumentRequest,
    current_user_id: int = Depends(get_current_user_id)
):
    """
    Delete a document from the vector store

    - **document_id**: Unique identifier of the document to delete
    - Requires authentication
    """
    try:
        logger.info(f"Received request to delete document: {request.document_id} for user: {current_user_id}")

        result = document_service.delete_document(request.document_id, current_user_id)

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
async def conversation(
    request: ConversationRequest,
    current_user_id: int = Depends(get_current_user_id)
):
    """
    Have a conversation with the AI based on uploaded documents

    - **session_id**: Unique session identifier for conversation continuity
    - **question**: User's question
    - Requires authentication
    """
    try:
        logger.info(f"Received conversation request for session: {request.session_id} from user: {current_user_id}")

        result = conversation_service.get_response(request.session_id, request.question, current_user_id)

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
    import os
    
    # Use environment variable or default to localhost for debugging
    debug_host = os.getenv("DEBUG_HOST", "127.0.0.1")
    
    uvicorn.run(
        "app.main:app",
        host=debug_host,  # Configurable host
        port=8000,
        reload=True,
        log_level="debug"  # Changed to debug level for debugging
    )

## uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
## .venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000