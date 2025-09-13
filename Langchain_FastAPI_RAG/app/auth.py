from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional
from app.services.user_service import UserService
from app.utils.logger import setup_logger

logger = setup_logger(__name__)

# Security scheme for Bearer token
security = HTTPBearer()

def get_user_service() -> UserService:
    """Dependency to get UserService instance"""
    return UserService()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    user_service: UserService = Depends(get_user_service)
):
    """Dependency to get current authenticated user"""
    try:
        token = credentials.credentials
        user = user_service.get_current_user(token)
        
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        return user
    
    except Exception as e:
        logger.error(f"Authentication error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

def get_current_user_id(current_user: dict = Depends(get_current_user)) -> int:
    """Dependency to get current user ID"""
    return current_user["user_id"]