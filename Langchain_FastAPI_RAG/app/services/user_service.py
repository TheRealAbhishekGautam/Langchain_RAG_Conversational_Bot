import secrets
from typing import Optional, Dict
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt
from app.database.sqlite_handler import SQLiteHandler
from app.config.settings import settings
from app.utils.logger import setup_logger

logger = setup_logger(__name__)

class UserService:
    def __init__(self):
        self.db_handler = SQLiteHandler()
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        # Use a secret key from settings
        self.secret_key = settings.secret_key
        self.algorithm = "HS256"
        self.access_token_expire_minutes = settings.access_token_expire_minutes

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verify a password against its hash"""
        return self.pwd_context.verify(plain_password, hashed_password)

    def get_password_hash(self, password: str) -> str:
        """Hash a password"""
        return self.pwd_context.hash(password)

    def create_access_token(self, data: dict, expires_delta: Optional[timedelta] = None):
        """Create JWT token"""
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=self.access_token_expire_minutes)
        
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
        return encoded_jwt

    def verify_token(self, token: str) -> Optional[Dict]:
        """Verify JWT token and return user data"""
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            user_id: int = payload.get("sub")
            if user_id is None:
                return None
            return {"user_id": int(user_id)}
        except JWTError:
            return None

    def register_user(self, username: str, email: str, password: str) -> Dict:
        """Register a new user"""
        try:
            # Check if user already exists
            existing_user = self.db_handler.get_user_by_username(username)
            if existing_user:
                return {
                    'success': False,
                    'message': 'Username already exists'
                }

            existing_email = self.db_handler.get_user_by_email(email)
            if existing_email:
                return {
                    'success': False,
                    'message': 'Email already registered'
                }

            # Hash password and create user
            password_hash = self.get_password_hash(password)
            user_id = self.db_handler.create_user(username, email, password_hash)

            if user_id:
                user_data = self.db_handler.get_user_by_id(user_id)
                logger.info(f"User registered successfully: {username}")
                return {
                    'success': True,
                    'message': 'User registered successfully',
                    'user_info': {
                        'user_id': user_data['ID'],
                        'username': user_data['USERNAME'],
                        'email': user_data['EMAIL'],
                        'created_at': user_data['CREATED_AT']
                    }
                }
            else:
                return {
                    'success': False,
                    'message': 'Failed to create user'
                }

        except Exception as e:
            logger.error(f"Error registering user: {str(e)}")
            return {
                'success': False,
                'message': f'Registration failed: {str(e)}'
            }

    def authenticate_user(self, username: str, password: str) -> Dict:
        """Authenticate user and return login response"""
        try:
            user_data = self.db_handler.get_user_by_username(username)
            
            if not user_data:
                return {
                    'success': False,
                    'message': 'Invalid username or password'
                }

            if not self.verify_password(password, user_data['PASSWORD_HASH']):
                return {
                    'success': False,
                    'message': 'Invalid username or password'
                }

            # Create access token
            access_token_expires = timedelta(minutes=self.access_token_expire_minutes)
            access_token = self.create_access_token(
                data={"sub": str(user_data['ID'])}, 
                expires_delta=access_token_expires
            )

            logger.info(f"User authenticated successfully: {username}")
            return {
                'success': True,
                'message': 'Login successful',
                'user_info': {
                    'user_id': user_data['ID'],
                    'username': user_data['USERNAME'],
                    'email': user_data['EMAIL'],
                    'created_at': user_data['CREATED_AT']
                },
                'access_token': access_token,
                'token_type': 'bearer'
            }

        except Exception as e:
            logger.error(f"Error authenticating user: {str(e)}")
            return {
                'success': False,
                'message': f'Authentication failed: {str(e)}'
            }

    def get_current_user(self, token: str) -> Optional[Dict]:
        """Get current user from token"""
        try:
            token_data = self.verify_token(token)
            if not token_data:
                return None

            user_data = self.db_handler.get_user_by_id(token_data["user_id"])
            if user_data:
                return {
                    'user_id': user_data['ID'],
                    'username': user_data['USERNAME'],
                    'email': user_data['EMAIL'],
                    'created_at': user_data['CREATED_AT']
                }
            return None

        except Exception as e:
            logger.error(f"Error getting current user: {str(e)}")
            return None

    def create_reset_token(self, email: str) -> Optional[str]:
        """Create a password reset token for an email"""
        try:
            user_data = self.db_handler.get_user_by_email(email)
            if not user_data:
                return None  # Don't reveal if email exists

            # Create a reset token (expires in 1 hour)
            reset_token_expire = timedelta(hours=1)
            reset_token = self.create_access_token(
                data={"sub": str(user_data['ID']), "type": "reset"}, 
                expires_delta=reset_token_expire
            )
            
            # Store reset token in database with expiry
            self.db_handler.store_reset_token(user_data['ID'], reset_token)
            
            logger.info(f"Password reset token created for user: {user_data['USERNAME']}")
            return reset_token

        except Exception as e:
            logger.error(f"Error creating reset token: {str(e)}")
            return None

    def reset_password(self, token: str, new_password: str) -> Dict:
        """Reset password using reset token"""
        try:
            # Verify reset token
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            user_id = payload.get("sub")
            token_type = payload.get("type")
            
            if not user_id or token_type != "reset":
                return {
                    'success': False,
                    'message': 'Invalid or expired reset token'
                }

            # Check if token exists in database
            if not self.db_handler.verify_reset_token(int(user_id), token):
                return {
                    'success': False,
                    'message': 'Invalid or expired reset token'
                }

            # Hash new password and update
            password_hash = self.get_password_hash(new_password)
            success = self.db_handler.update_user_password(int(user_id), password_hash)
            
            if success:
                # Delete the used reset token
                self.db_handler.delete_reset_token(int(user_id), token)
                logger.info(f"Password reset successfully for user ID: {user_id}")
                return {
                    'success': True,
                    'message': 'Password reset successfully'
                }
            else:
                return {
                    'success': False,
                    'message': 'Failed to update password'
                }

        except JWTError:
            return {
                'success': False,
                'message': 'Invalid or expired reset token'
            }
        except Exception as e:
            logger.error(f"Error resetting password: {str(e)}")
            return {
                'success': False,
                'message': f'Password reset failed: {str(e)}'
            }