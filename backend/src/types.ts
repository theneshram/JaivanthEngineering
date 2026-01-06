export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  messageId?: string;
  error?: string;
}
