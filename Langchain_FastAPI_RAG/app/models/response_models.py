from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class BaseResponse(BaseModel):
    success: bool = Field(..., description="Whether the operation was successful")
    message: str = Field(..., description="Response message")

class DocumentInfo(BaseModel):
    document_id: str = Field(..., description="Unique document identifier")
    filename: str = Field(..., description="Original filename")
    file_type: str = Field(..., description="File type (pdf, docx)")
    upload_timestamp: datetime = Field(..., description="When the document was uploaded")
    chunk_count: int = Field(..., description="Number of chunks created from this document")

class AddDocumentResponse(BaseResponse):
    document_info: Optional[DocumentInfo] = None

class DocumentListResponse(BaseResponse):
    documents: List[DocumentInfo] = Field(default=[], description="List of documents")
    total_count: int = Field(default=0, description="Total number of documents")

class DeleteDocumentResponse(BaseResponse):
    deleted_document_id: Optional[str] = None

class ConversationResponse(BaseResponse):
    session_id: str = Field(..., description="Session identifier")
    question: str = Field(..., description="User's question")
    answer: str = Field(..., description="AI's response")
    sources: List[str] = Field(default=[], description="Source documents used")
    response_timestamp: datetime = Field(..., description="When the response was generated")

class ErrorResponse(BaseResponse):
    error_code: str = Field(..., description="Error code")
    error_details: Optional[Dict[str, Any]] = None

class UserInfo(BaseModel):
    user_id: int = Field(..., description="User ID")
    username: str = Field(..., description="Username")
    email: str = Field(..., description="Email address")
    created_at: datetime = Field(..., description="When the user was created")

class UserRegistrationResponse(BaseResponse):
    user_info: Optional[UserInfo] = None

class UserLoginResponse(BaseResponse):
    user_info: Optional[UserInfo] = None
    access_token: Optional[str] = Field(None, description="JWT access token")
    token_type: str = Field(default="bearer", description="Token type")

class ForgotPasswordResponse(BaseResponse):
    pass

class ResetPasswordResponse(BaseResponse):
    pass
