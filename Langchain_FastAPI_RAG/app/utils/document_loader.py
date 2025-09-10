import os
import tempfile
from typing import List, Tuple
from langchain_core.documents import Document
from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from fastapi import UploadFile
from app.config.settings import settings
from app.utils.logger import setup_logger

logger = setup_logger(__name__)

class DocumentLoader:
    def __init__(self):
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=settings.chunk_size,
            chunk_overlap=settings.chunk_overlap,
            length_function=len
        )

    async def load_and_split_document(self, file: UploadFile) -> Tuple[List[Document], str]:
        """Load and split a document into chunks"""
        try:
            # Validate file type
            file_extension = self._get_file_extension(file.filename)
            if file_extension not in ['.pdf', '.docx']:
                raise ValueError(f"Unsupported file type: {file_extension}")

            # Save uploaded file temporarily
            temp_file_path = await self._save_temp_file(file)

            try:
                # Load document
                documents = self._load_document(temp_file_path, file_extension)
                logger.info(f"Loaded {len(documents)} pages from {file.filename}")

                # Split documents
                splits = self.text_splitter.split_documents(documents)
                logger.info(f"Split document into {len(splits)} chunks")

                return splits, file_extension.lstrip('.')

            finally:
                # Clean up temp file
                if os.path.exists(temp_file_path):
                    os.unlink(temp_file_path)

        except Exception as e:
            logger.error(f"Error processing document {file.filename}: {str(e)}")
            raise

    def _get_file_extension(self, filename: str) -> str:
        """Get file extension"""
        return os.path.splitext(filename.lower())[1]

    async def _save_temp_file(self, file: UploadFile) -> str:
        """Save uploaded file to temporary location"""
        file_extension = self._get_file_extension(file.filename)

        with tempfile.NamedTemporaryFile(delete=False, suffix=file_extension) as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_file_path = temp_file.name

        logger.info(f"Saved temporary file: {temp_file_path}")
        return temp_file_path

    def _load_document(self, file_path: str, file_extension: str) -> List[Document]:
        """Load document based on file type"""
        try:
            if file_extension == '.pdf':
                loader = PyPDFLoader(file_path)
            elif file_extension == '.docx':
                loader = Docx2txtLoader(file_path)
            else:
                raise ValueError(f"Unsupported file extension: {file_extension}")

            documents = loader.load()
            return documents

        except Exception as e:
            logger.error(f"Error loading document from {file_path}: {str(e)}")
            raise
