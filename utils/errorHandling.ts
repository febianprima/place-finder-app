/**
 * Safely extracts error message from unknown error type
 * @param error - The caught error (unknown type)
 * @param fallback - Fallback message if error cannot be parsed
 * @returns A string error message
 */
export const getErrorMessage = (error: unknown, fallback = 'An unknown error occurred'): string => {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }
  
  return fallback;
};

/**
 * Logs error with context information
 * @param context - Context where error occurred
 * @param error - The error to log
 */
export const logError = (context: string, error: unknown): void => {
  const message = getErrorMessage(error);
  console.error(`[${context}]`, message, error);
};
