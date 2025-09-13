from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from fastapi import UploadFile

class ConversationRequest(BaseModel):
    session_id: Optional[str] = Field(None, description="Optional session identifier. If not provided, a new session will be created")
    question: str = Field(..., min_length=1, description="User's question")

class DeleteDocumentRequest(BaseModel):
    document_id: str = Field(..., description="Document identifier to delete")

class DocumentListRequest(BaseModel):
    limit: Optional[int] = Field(default=10, ge=1, le=100, description="Number of documents to return")
    offset: Optional[int] = Field(default=0, ge=0, description="Number of documents to skip")

class UserRegistrationRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=50, description="Username")
    email: EmailStr = Field(..., description="Email address")
    password: str = Field(..., min_length=8, description="Password")

class UserLoginRequest(BaseModel):
    username: str = Field(..., description="Username")
    password: str = Field(..., description="Password")
