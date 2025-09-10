from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    # OpenAI Configuration
    openai_api_key: str = ""

    # Langchain Configuration
    langchain_tracing_v2: str = "true"
    langchain_api_key: str = ""
    langchain_project: str = ""

    # Vector Store Configuration
    chroma_persist_directory: str = "./chroma_db"
    chroma_collection_name: str = "document_collection"

    # Database Configuration
    sqlite_db_name: str = "rag_app.db"

    # Document Processing Configuration
    chunk_size: int = 1000
    chunk_overlap: int = 200
    similarity_search_k: int = 3

    # API Configuration
    api_title: str = "RAG FastAPI Application"
    api_description: str = "A FastAPI application for document-based conversational AI using RAG"
    api_version: str = "1.0.0"

    class Config:
        env_file = ".env"

settings = Settings()

# Set environment variables
os.environ["OPENAI_API_KEY"] = settings.openai_api_key
os.environ["LANGCHAIN_TRACING_V2"] = settings.langchain_tracing_v2
os.environ["LANGCHAIN_API_KEY"] = settings.langchain_api_key
os.environ["LANGCHAIN_PROJECT"] = settings.langchain_project
