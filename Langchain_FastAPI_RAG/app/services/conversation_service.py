from typing import List, Dict, Optional
import uuid
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from app.services.vector_store_service import VectorStoreService
from app.database.sqlite_handler import SQLiteHandler
from app.config.settings import settings
from app.utils.logger import setup_logger

logger = setup_logger(__name__)

class ConversationService:
    def __init__(self):
        self.llm = ChatOpenAI(model="gpt-4o-mini")
        self.output_parser = StrOutputParser()
        self.vector_store_service = VectorStoreService()
        self.db_handler = SQLiteHandler()
        self._setup_chains()

    def _setup_chains(self):
        """Setup RAG chains"""
        try:
            # Contextualize question prompt
            contextualize_q_system_prompt = (
                "Given a chat history and the latest user question "
                "which might reference context in the chat history, "
                "formulate a standalone question which can be understood "
                "without the chat history. Do NOT answer the question, "
                "just reformulate it if needed and otherwise return it as is."
            )

            contextualize_q_prompt = ChatPromptTemplate.from_messages([
                ("system", contextualize_q_system_prompt),
                MessagesPlaceholder("chat_history"),
                ("human", "{input}")
            ])

            # Create history aware retriever
            retriever = self.vector_store_service.get_retriever()
            self.history_aware_retriever = create_history_aware_retriever(
                self.llm, retriever, contextualize_q_prompt
            )

            # QA prompt
            qa_prompt = ChatPromptTemplate.from_messages([
                ("system", "You are a helpful AI assistant. Use the following context to answer questions accurately and concisely."),
                ("system", "Context: {context}"),
                MessagesPlaceholder(variable_name="chat_history"),
                ("human", "{input}")
            ])

            # Create question answer chain
            question_answer_chain = create_stuff_documents_chain(self.llm, qa_prompt)

            # Create RAG chain
            self.rag_chain = create_retrieval_chain(
                self.history_aware_retriever, 
                question_answer_chain
            )

            logger.info("Conversation chains setup successfully")

        except Exception as e:
            logger.error(f"Error setting up conversation chains: {str(e)}")
            raise

    def get_response(self, session_id: Optional[str], question: str, user_id: int) -> Dict:
        """Get conversational response"""
        try:
            # Generate new session_id if not provided
            if session_id is None:
                session_id = str(uuid.uuid4())
                logger.info(f"Created new session: {session_id}")

            # Get chat history
            chat_history = self.db_handler.get_chat_history(session_id, user_id)
            logger.info(f"Retrieved {len(chat_history)} messages for session: {session_id}, user: {user_id}")

            # Get response from RAG chain
            response = self.rag_chain.invoke({
                "input": question,
                "chat_history": chat_history
            })

            answer = response.get('answer', '')

            # Extract source documents
            sources = []
            if 'context' in response:
                for doc in response['context']:
                    source = doc.metadata.get('source', '')
                    if source and source not in sources:
                        sources.append(source)

            # Save conversation to database
            self.db_handler.insert_conversation_log(
                session_id=session_id,
                user_query=question,
                gpt_response=answer,
                model="gpt-4o-mini",
                user_id=user_id
            )

            logger.info(f"Generated response for session: {session_id}")

            return {
                'answer': answer,
                'sources': sources,
                'session_id': session_id
            }

        except Exception as e:
            logger.error(f"Error generating response: {str(e)}")
            raise
