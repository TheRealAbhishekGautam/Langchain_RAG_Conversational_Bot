export interface ConversationRequest {
  session_id?: string | null;
  question: string;
}

export interface ConversationResponse {
  success: boolean;
  message: string;
  session_id: string;
  question: string;
  answer: string;
  sources: string[];
  response_timestamp: string;
}

export interface DocumentInfo {
  document_id: string;
  filename: string;
  file_type: string;
  upload_timestamp: string;
  chunk_count: number;
}

export interface AddDocumentResponse {
  success: boolean;
  message: string;
  document_info?: DocumentInfo;
}

export interface DocumentListResponse {
  success: boolean;
  message: string;
  documents: DocumentInfo[];
  total_count: number;
}

export interface DeleteDocumentResponse {
  success: boolean;
  message: string;
  deleted_document_id?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
  sources?: string[];
}

export interface Session {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt?: string;
  updatedAt?: string;
}
