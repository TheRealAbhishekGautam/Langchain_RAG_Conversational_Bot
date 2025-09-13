import sqlite3
from datetime import datetime
from typing import List, Dict, Optional
from app.config.settings import settings
from app.utils.logger import setup_logger

logger = setup_logger(__name__)

class SQLiteHandler:
    def __init__(self):
        self.db_name = settings.sqlite_db_name
        self._init_database()

    def _get_connection(self) -> sqlite3.Connection:
        """Get database connection"""
        conn = sqlite3.connect(self.db_name)
        conn.row_factory = sqlite3.Row
        return conn

    def _init_database(self):
        """Initialize database tables - clean slate approach"""
        try:
            conn = self._get_connection()

            # Drop existing tables to start fresh
            # conn.execute('DROP TABLE IF EXISTS APPLICATION_LOGS')
            # conn.execute('DROP TABLE IF EXISTS DOCUMENTS')
            # Keep USERS table if it exists

            # Users table
            conn.execute('''
                CREATE TABLE IF NOT EXISTS USERS (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    USERNAME TEXT UNIQUE NOT NULL,
                    EMAIL TEXT UNIQUE NOT NULL,
                    PASSWORD_HASH TEXT NOT NULL,
                    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    IS_ACTIVE BOOLEAN DEFAULT 1
                )
            ''')

            # Application logs table (with mandatory user_id foreign key)
            conn.execute('''
                CREATE TABLE IF NOT EXISTS APPLICATION_LOGS (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    SESSION_ID TEXT NOT NULL,
                    USER_ID INTEGER NOT NULL,
                    USER_QUERY TEXT NOT NULL,
                    GPT_RESPONSE TEXT NOT NULL,
                    MODEL TEXT NOT NULL,
                    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (USER_ID) REFERENCES USERS (ID) ON DELETE CASCADE
                )
            ''')

            # Document metadata table (with mandatory user_id foreign key)
            conn.execute('''
                CREATE TABLE IF NOT EXISTS DOCUMENTS (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    DOCUMENT_ID TEXT UNIQUE NOT NULL,
                    USER_ID INTEGER NOT NULL,
                    FILENAME TEXT NOT NULL,
                    FILE_TYPE TEXT NOT NULL,
                    UPLOAD_TIMESTAMP TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    CHUNK_COUNT INTEGER DEFAULT 0,
                    FOREIGN KEY (USER_ID) REFERENCES USERS (ID) ON DELETE CASCADE
                )
            ''')

            # Create reset tokens table if not exists
            conn.execute('''
                CREATE TABLE IF NOT EXISTS RESET_TOKENS (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    USER_ID INTEGER NOT NULL,
                    TOKEN TEXT NOT NULL,
                    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (USER_ID) REFERENCES USERS (ID) ON DELETE CASCADE
                )
            ''')

            conn.commit()
            logger.info("Database initialized successfully with clean schema")

        except Exception as e:
            logger.error(f"Error initializing database: {str(e)}")
            raise
        finally:
            conn.close()

    def insert_conversation_log(self, session_id: str, user_id: int, user_query: str, 
                              gpt_response: str, model: str) -> bool:
        """Insert conversation log - user_id is mandatory"""
        try:
            conn = self._get_connection()
            conn.execute(
                'INSERT INTO APPLICATION_LOGS (SESSION_ID, USER_ID, USER_QUERY, GPT_RESPONSE, MODEL) VALUES (?, ?, ?, ?, ?)',
                (session_id, user_id, user_query, gpt_response, model)
            )
            conn.commit()
            logger.info(f"Conversation log inserted for session: {session_id}, user: {user_id}")
            return True

        except Exception as e:
            logger.error(f"Error inserting conversation log: {str(e)}")
            return False
        finally:
            conn.close()

    def get_chat_history(self, session_id: str, user_id: int) -> List[Dict]:
        """Get chat history for a session and user - user_id is mandatory"""
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            cursor.execute(
                'SELECT USER_QUERY, GPT_RESPONSE FROM APPLICATION_LOGS WHERE SESSION_ID = ? AND USER_ID = ? ORDER BY CREATED_AT',
                (session_id, user_id)
            )

            messages = []
            for row in cursor.fetchall():
                messages.extend([
                    {"role": "human", "content": row['USER_QUERY']},
                    {"role": "ai", "content": row['GPT_RESPONSE']}
                ])

            logger.info(f"Retrieved {len(messages)} messages for session: {session_id}, user: {user_id}")
            return messages

        except Exception as e:
            logger.error(f"Error retrieving chat history: {str(e)}")
            return []
        finally:
            conn.close()

    def insert_document_metadata(self, document_id: str, user_id: int, filename: str, 
                                file_type: str, chunk_count: int) -> bool:
        """Insert document metadata - user_id is mandatory"""
        try:
            conn = self._get_connection()
            conn.execute(
                'INSERT INTO DOCUMENTS (DOCUMENT_ID, USER_ID, FILENAME, FILE_TYPE, CHUNK_COUNT) VALUES (?, ?, ?, ?, ?)',
                (document_id, user_id, filename, file_type, chunk_count)
            )
            conn.commit()
            logger.info(f"Document metadata inserted: {filename} for user: {user_id}")
            return True

        except Exception as e:
            logger.error(f"Error inserting document metadata: {str(e)}")
            return False
        finally:
            conn.close()

    def get_document_list(self, user_id: int, limit: int = 10, offset: int = 0) -> List[Dict]:
        """Get list of documents for a specific user - user_id is mandatory"""
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            cursor.execute(
                'SELECT * FROM DOCUMENTS WHERE USER_ID = ? ORDER BY UPLOAD_TIMESTAMP DESC LIMIT ? OFFSET ?',
                (user_id, limit, offset)
            )

            documents = [dict(row) for row in cursor.fetchall()]
            logger.info(f"Retrieved {len(documents)} documents for user: {user_id}")
            return documents

        except Exception as e:
            logger.error(f"Error retrieving document list: {str(e)}")
            return []
        finally:
            conn.close()

    def delete_document_metadata(self, document_id: str, user_id: int) -> bool:
        """Delete document metadata for a specific user - user_id is mandatory"""
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            
            # Only delete documents that belong to the specific user
            cursor.execute(
                'DELETE FROM DOCUMENTS WHERE DOCUMENT_ID = ? AND USER_ID = ?',
                (document_id, user_id)
            )
            
            conn.commit()
            
            if cursor.rowcount > 0:
                logger.info(f"Document {document_id} deleted successfully for user: {user_id}")
                return True
            else:
                logger.warning(f"Document {document_id} not found for user: {user_id}")
                return False

        except Exception as e:
            logger.error(f"Error deleting document metadata: {str(e)}")
            return False
        finally:
            conn.close()

    def get_total_document_count(self, user_id: int) -> int:
        """Get total count of documents for a specific user - user_id is mandatory"""
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            
            cursor.execute('SELECT COUNT(*) as count FROM DOCUMENTS WHERE USER_ID = ?', (user_id,))
            result = cursor.fetchone()
            return result['count'] if result else 0

        except Exception as e:
            logger.error(f"Error getting document count: {str(e)}")
            return 0
        finally:
            conn.close()

    # User management methods
    def create_user(self, username: str, email: str, password_hash: str) -> Optional[int]:
        """Create a new user"""
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            cursor.execute(
                'INSERT INTO USERS (USERNAME, EMAIL, PASSWORD_HASH) VALUES (?, ?, ?)',
                (username, email, password_hash)
            )
            user_id = cursor.lastrowid
            conn.commit()
            logger.info(f"User created: {username} with ID: {user_id}")
            return user_id

        except sqlite3.IntegrityError as e:
            logger.error(f"User creation failed - integrity error: {str(e)}")
            return None
        except Exception as e:
            logger.error(f"Error creating user: {str(e)}")
            return None
        finally:
            conn.close()

    def get_user_by_username(self, username: str) -> Optional[Dict]:
        """Get user by username"""
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM USERS WHERE USERNAME = ? AND IS_ACTIVE = 1', (username,))
            row = cursor.fetchone()
            
            if row:
                return dict(row)
            return None

        except Exception as e:
            logger.error(f"Error retrieving user by username: {str(e)}")
            return None
        finally:
            conn.close()

    def get_user_by_email(self, email: str) -> Optional[Dict]:
        """Get user by email"""
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM USERS WHERE EMAIL = ? AND IS_ACTIVE = 1', (email,))
            row = cursor.fetchone()
            
            if row:
                return dict(row)
            return None

        except Exception as e:
            logger.error(f"Error retrieving user by email: {str(e)}")
            return None
        finally:
            conn.close()

    def get_user_by_id(self, user_id: int) -> Optional[Dict]:
        """Get user by ID"""
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM USERS WHERE ID = ? AND IS_ACTIVE = 1', (user_id,))
            row = cursor.fetchone()
            
            if row:
                return dict(row)
            return None

        except Exception as e:
            logger.error(f"Error retrieving user by ID: {str(e)}")
            return None
        finally:
            conn.close()

    def store_reset_token(self, user_id: int, reset_token: str) -> bool:
        """Store password reset token"""
        try:
            conn = self._get_connection()
            
            # Delete any existing tokens for this user
            conn.execute('DELETE FROM RESET_TOKENS WHERE USER_ID = ?', (user_id,))
            
            # Insert new token
            conn.execute(
                'INSERT INTO RESET_TOKENS (USER_ID, TOKEN) VALUES (?, ?)',
                (user_id, reset_token)
            )
            conn.commit()
            logger.info(f"Reset token stored for user ID: {user_id}")
            return True

        except Exception as e:
            logger.error(f"Error storing reset token: {str(e)}")
            return False
        finally:
            conn.close()

    def verify_reset_token(self, user_id: int, token: str) -> bool:
        """Verify if reset token exists and is valid (within 1 hour)"""
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            cursor.execute('''
                SELECT * FROM RESET_TOKENS 
                WHERE USER_ID = ? AND TOKEN = ? 
                AND datetime(CREATED_AT, '+1 hour') > datetime('now')
            ''', (user_id, token))
            
            result = cursor.fetchone()
            return result is not None

        except Exception as e:
            logger.error(f"Error verifying reset token: {str(e)}")
            return False
        finally:
            conn.close()

    def delete_reset_token(self, user_id: int, token: str) -> bool:
        """Delete used reset token"""
        try:
            conn = self._get_connection()
            conn.execute(
                'DELETE FROM RESET_TOKENS WHERE USER_ID = ? AND TOKEN = ?',
                (user_id, token)
            )
            conn.commit()
            logger.info(f"Reset token deleted for user ID: {user_id}")
            return True

        except Exception as e:
            logger.error(f"Error deleting reset token: {str(e)}")
            return False
        finally:
            conn.close()

    def update_user_password(self, user_id: int, password_hash: str) -> bool:
        """Update user password"""
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            cursor.execute(
                'UPDATE USERS SET PASSWORD_HASH = ? WHERE ID = ?',
                (password_hash, user_id)
            )
            conn.commit()
            
            if cursor.rowcount > 0:
                logger.info(f"Password updated for user ID: {user_id}")
                return True
            else:
                logger.warning(f"User ID {user_id} not found for password update")
                return False

        except Exception as e:
            logger.error(f"Error updating user password: {str(e)}")
            return False
        finally:
            conn.close()
