export interface ErrorResponse {
  type: string;
  title: string;
  status: number;
  traceId: string;
  errors: Errors;
}

export interface Errors {
  Body: string[];
}
