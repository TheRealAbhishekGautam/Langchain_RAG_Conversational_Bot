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

// Auth models
export interface UserInfo {
  user_id: number;
  username: string;
  email: string;
  created_at: string;
}

export interface UserRegistrationRequest {
  username: string;
  email: string;
  password: string;
}

export interface UserRegistrationResponse {
  success: boolean;
  message: string;
  user_info?: UserInfo;
}

export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface UserLoginResponse {
  success: boolean;
  message: string;
  user_info?: UserInfo;
  access_token?: string;
  token_type?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}
