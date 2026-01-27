import { APP_CONFIG } from '@/constants';
import { logError } from './errorHandling';

/**
 * Executes a function with exponential backoff retry logic
 * @param fn - The async function to execute
 * @param maxRetries - Maximum number of retry attempts
 * @param context - Context for logging
 * @returns The result of the function
 * @throws The last error if all retries fail
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = APP_CONFIG.MAX_RETRY_ATTEMPTS,
  context = 'withRetry'
): Promise<T> {
  let lastError: unknown;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: unknown) {
      lastError = error;
      
      if (attempt < maxRetries) {
        const delay = APP_CONFIG.RETRY_DELAY_MS * Math.pow(APP_CONFIG.RETRY_BACKOFF_MULTIPLIER, attempt);
        console.warn(`[${context}] Attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        logError(`${context} (all retries exhausted)`, error);
      }
    }
  }
  
  throw lastError;
}
