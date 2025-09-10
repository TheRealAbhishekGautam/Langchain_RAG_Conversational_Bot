import uuid
from typing import List, Dict, Optional
from datetime import datetime
from fastapi import UploadFile
from app.utils.document_loader import DocumentLoader
from app.services.vector_store_service import VectorStoreService
from app.database.sqlite_handler import SQLiteHandler
from app.models.response_models import DocumentInfo
from app.utils.logger import setup_logger

logger = setup_logger(__name__)

class DocumentService:
    def __init__(self):
        self.document_loader = DocumentLoader()
        self.vector_store_service = VectorStoreService()
        self.db_handler = SQLiteHandler()

    async def add_document(self, file: UploadFile) -> Dict:
        """Add a new document"""
        try:
            document_id = str(uuid.uuid4())

            # Load and split document
            splits, file_type = await self.document_loader.load_and_split_document(file)

            # Add to vector store
            success = self.vector_store_service.add_documents(splits, document_id)
            if not success:
                raise Exception("Failed to add documents to vector store")

            # Save metadata to database
            metadata_success = self.db_handler.insert_document_metadata(
                document_id=document_id,
                filename=file.filename,
                file_type=file_type,
                chunk_count=len(splits)
            )

            if not metadata_success:
                # Try to clean up vector store if metadata save failed
                self.vector_store_service.delete_documents(document_id)
                raise Exception("Failed to save document metadata")

            document_info = DocumentInfo(
                document_id=document_id,
                filename=file.filename,
                file_type=file_type,
                upload_timestamp=datetime.now(),
                chunk_count=len(splits)
            )

            logger.info(f"Successfully added document: {file.filename}")

            return {
                'success': True,
                'message': f'Document {file.filename} added successfully',
                'document_info': document_info
            }

        except Exception as e:
            logger.error(f"Error adding document {file.filename}: {str(e)}")
            return {
                'success': False,
                'message': f'Error adding document: {str(e)}',
                'document_info': None
            }

    def get_document_list(self, limit: int = 10, offset: int = 0) -> Dict:
        """Get list of documents"""
        try:
            # Get documents from database
            documents_data = self.db_handler.get_document_list(limit, offset)
            total_count = self.db_handler.get_total_document_count()

            documents = []
            for doc_data in documents_data:
                document_info = DocumentInfo(
                    document_id=doc_data['DOCUMENT_ID'],
                    filename=doc_data['FILENAME'],
                    file_type=doc_data['FILE_TYPE'],
                    upload_timestamp=datetime.fromisoformat(doc_data['UPLOAD_TIMESTAMP']),
                    chunk_count=doc_data['CHUNK_COUNT']
                )
                documents.append(document_info)

            logger.info(f"Retrieved {len(documents)} documents")

            return {
                'success': True,
                'message': f'Retrieved {len(documents)} documents',
                'documents': documents,
                'total_count': total_count
            }

        except Exception as e:
            logger.error(f"Error retrieving document list: {str(e)}")
            return {
                'success': False,
                'message': f'Error retrieving documents: {str(e)}',
                'documents': [],
                'total_count': 0
            }

    def delete_document(self, document_id: str) -> Dict:
        """Delete a document"""
        try:
            # Delete from vector store
            vector_success = self.vector_store_service.delete_documents(document_id)

            # Delete metadata from database
            metadata_success = self.db_handler.delete_document_metadata(document_id)

            if vector_success or metadata_success:
                logger.info(f"Successfully deleted document: {document_id}")
                return {
                    'success': True,
                    'message': f'Document {document_id} deleted successfully',
                    'deleted_document_id': document_id
                }
            else:
                return {
                    'success': False,
                    'message': f'Document {document_id} not found',
                    'deleted_document_id': None
                }

        except Exception as e:
            logger.error(f"Error deleting document {document_id}: {str(e)}")
            return {
                'success': False,
                'message': f'Error deleting document: {str(e)}',
                'deleted_document_id': None
            }
