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
        """Initialize database tables"""
        try:
            conn = self._get_connection()

            # Application logs table
            conn.execute('''
                CREATE TABLE IF NOT EXISTS APPLICATION_LOGS (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    SESSION_ID TEXT NOT NULL,
                    USER_QUERY TEXT NOT NULL,
                    GPT_RESPONSE TEXT NOT NULL,
                    MODEL TEXT NOT NULL,
                    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')

            # Document metadata table
            conn.execute('''
                CREATE TABLE IF NOT EXISTS DOCUMENTS (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    DOCUMENT_ID TEXT UNIQUE NOT NULL,
                    FILENAME TEXT NOT NULL,
                    FILE_TYPE TEXT NOT NULL,
                    UPLOAD_TIMESTAMP TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    CHUNK_COUNT INTEGER DEFAULT 0
                )
            ''')

            conn.commit()
            logger.info("Database initialized successfully")

        except Exception as e:
            logger.error(f"Error initializing database: {str(e)}")
            raise
        finally:
            conn.close()

    def insert_conversation_log(self, session_id: str, user_query: str, 
                              gpt_response: str, model: str) -> bool:
        """Insert conversation log"""
        try:
            conn = self._get_connection()
            conn.execute(
                'INSERT INTO APPLICATION_LOGS (SESSION_ID, USER_QUERY, GPT_RESPONSE, MODEL) VALUES (?, ?, ?, ?)',
                (session_id, user_query, gpt_response, model)
            )
            conn.commit()
            logger.info(f"Conversation log inserted for session: {session_id}")
            return True

        except Exception as e:
            logger.error(f"Error inserting conversation log: {str(e)}")
            return False
        finally:
            conn.close()

    def get_chat_history(self, session_id: str) -> List[Dict]:
        """Get chat history for a session"""
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            cursor.execute(
                'SELECT USER_QUERY, GPT_RESPONSE FROM APPLICATION_LOGS WHERE SESSION_ID = ? ORDER BY CREATED_AT',
                (session_id,)
            )

            messages = []
            for row in cursor.fetchall():
                messages.extend([
                    {"role": "human", "content": row['USER_QUERY']},
                    {"role": "ai", "content": row['GPT_RESPONSE']}
                ])

            logger.info(f"Retrieved {len(messages)} messages for session: {session_id}")
            return messages

        except Exception as e:
            logger.error(f"Error retrieving chat history: {str(e)}")
            return []
        finally:
            conn.close()

    def insert_document_metadata(self, document_id: str, filename: str, 
                                file_type: str, chunk_count: int) -> bool:
        """Insert document metadata"""
        try:
            conn = self._get_connection()
            conn.execute(
                'INSERT INTO DOCUMENTS (DOCUMENT_ID, FILENAME, FILE_TYPE, CHUNK_COUNT) VALUES (?, ?, ?, ?)',
                (document_id, filename, file_type, chunk_count)
            )
            conn.commit()
            logger.info(f"Document metadata inserted: {filename}")
            return True

        except Exception as e:
            logger.error(f"Error inserting document metadata: {str(e)}")
            return False
        finally:
            conn.close()

    def get_document_list(self, limit: int = 10, offset: int = 0) -> List[Dict]:
        """Get list of documents"""
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            cursor.execute(
                'SELECT * FROM DOCUMENTS ORDER BY UPLOAD_TIMESTAMP DESC LIMIT ? OFFSET ?',
                (limit, offset)
            )

            documents = [dict(row) for row in cursor.fetchall()]
            logger.info(f"Retrieved {len(documents)} documents")
            return documents

        except Exception as e:
            logger.error(f"Error retrieving document list: {str(e)}")
            return []
        finally:
            conn.close()

    def delete_document_metadata(self, document_id: str) -> bool:
        """Delete document metadata"""
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            cursor.execute('DELETE FROM DOCUMENTS WHERE DOCUMENT_ID = ?', (document_id,))
            deleted_rows = cursor.rowcount
            conn.commit()

            if deleted_rows > 0:
                logger.info(f"Document metadata deleted: {document_id}")
                return True
            else:
                logger.warning(f"No document found with ID: {document_id}")
                return False

        except Exception as e:
            logger.error(f"Error deleting document metadata: {str(e)}")
            return False
        finally:
            conn.close()

    def get_total_document_count(self) -> int:
        """Get total count of documents"""
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            cursor.execute('SELECT COUNT(*) as count FROM DOCUMENTS')
            result = cursor.fetchone()
            return result['count'] if result else 0

        except Exception as e:
            logger.error(f"Error getting document count: {str(e)}")
            return 0
        finally:
            conn.close()
