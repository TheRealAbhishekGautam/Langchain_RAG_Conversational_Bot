import uuid
from typing import List, Optional
from langchain_core.documents import Document
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings
from app.config.settings import settings
from app.utils.logger import setup_logger

logger = setup_logger(__name__)

class VectorStoreService:
    def __init__(self):
        self.embedding_function = OpenAIEmbeddings()
        self.collection_name = settings.chroma_collection_name
        self.persist_directory = settings.chroma_persist_directory
        self._vector_store = None

    @property
    def vector_store(self) -> Chroma:
        """Lazy initialization of vector store"""
        if self._vector_store is None:
            try:
                self._vector_store = Chroma(
                    collection_name=self.collection_name,
                    embedding_function=self.embedding_function,
                    persist_directory=self.persist_directory
                )
                logger.info("Vector store initialized successfully")
            except Exception as e:
                logger.error(f"Error initializing vector store: {str(e)}")
                raise
        return self._vector_store

    def add_documents(self, documents: List[Document], document_id: str) -> bool:
        """Add documents to vector store"""
        try:
            # Add document_id to metadata for each chunk
            for doc in documents:
                doc.metadata['document_id'] = document_id

            # Add documents to vector store
            self.vector_store.add_documents(documents)
            logger.info(f"Added {len(documents)} documents to vector store with ID: {document_id}")
            return True

        except Exception as e:
            logger.error(f"Error adding documents to vector store: {str(e)}")
            return False

    def delete_documents(self, document_id: str) -> bool:
        """Delete documents from vector store by document_id"""
        try:
            # Get all documents with the specified document_id
            results = self.vector_store.get(
                where={"document_id": document_id}
            )

            if not results['ids']:
                logger.warning(f"No documents found with ID: {document_id}")
                return False

            # Delete documents by their IDs
            self.vector_store.delete(ids=results['ids'])
            logger.info(f"Deleted {len(results['ids'])} documents with ID: {document_id}")
            return True

        except Exception as e:
            logger.error(f"Error deleting documents from vector store: {str(e)}")
            return False

    def get_document_list(self) -> List[dict]:
        """Get list of documents in vector store"""
        try:
            # Get all documents
            results = self.vector_store.get()

            # Group by document_id
            document_groups = {}
            for i, doc_id in enumerate(results['ids']):
                metadata = results['metadatas'][i]
                document_id = metadata.get('document_id', 'unknown')

                if document_id not in document_groups:
                    document_groups[document_id] = {
                        'document_id': document_id,
                        'source': metadata.get('source', 'unknown'),
                        'chunk_count': 0
                    }
                document_groups[document_id]['chunk_count'] += 1

            documents = list(document_groups.values())
            logger.info(f"Retrieved {len(documents)} unique documents from vector store")
            return documents

        except Exception as e:
            logger.error(f"Error retrieving document list from vector store: {str(e)}")
            return []

    def get_retriever(self):
        """Get retriever for similarity search"""
        return self.vector_store.as_retriever(
            search_kwargs={"k": settings.similarity_search_k}
        )

    def similarity_search(self, query: str, k: Optional[int] = None) -> List[Document]:
        """Perform similarity search"""
        try:
            k = k or settings.similarity_search_k
            results = self.vector_store.similarity_search(query, k=k)
            logger.info(f"Similarity search returned {len(results)} results for query: {query[:50]}...")
            return results

        except Exception as e:
            logger.error(f"Error performing similarity search: {str(e)}")
            return []
