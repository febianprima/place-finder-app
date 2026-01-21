import { describe, it, expect } from 'vitest';
import { getErrorMessage } from '@/utils';

describe('getErrorMessage', () => {
  it('should extract message from Error instance', () => {
    const error = new Error('Test error');
    expect(getErrorMessage(error)).toBe('Test error');
  });

  it('should return string error as-is', () => {
    expect(getErrorMessage('String error')).toBe('String error');
  });

  it('should extract message from object with message property', () => {
    const error = { message: 'Object error' };
    expect(getErrorMessage(error)).toBe('Object error');
  });

  it('should return fallback for unknown error types', () => {
    expect(getErrorMessage(null)).toBe('An unknown error occurred');
    expect(getErrorMessage(undefined)).toBe('An unknown error occurred');
    expect(getErrorMessage(123)).toBe('An unknown error occurred');
  });

  it('should use custom fallback message', () => {
    expect(getErrorMessage(null, 'Custom fallback')).toBe('Custom fallback');
  });
});
