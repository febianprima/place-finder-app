import { describe, it, expect } from 'vitest';
import { formatTimestamp } from '@/utils';

describe('formatTimestamp', () => {
  it('should return "Just now" for recent timestamps', () => {
    const now = Date.now();
    expect(formatTimestamp(now)).toBe('Just now');
  });

  it('should return minutes ago', () => {
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    expect(formatTimestamp(fiveMinutesAgo)).toBe('5m ago');
  });

  it('should return hours ago', () => {
    const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
    expect(formatTimestamp(twoHoursAgo)).toBe('2h ago');
  });

  it('should return days ago', () => {
    const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
    expect(formatTimestamp(threeDaysAgo)).toBe('3d ago');
  });

  it('should return date for old timestamps', () => {
    const tenDaysAgo = Date.now() - 10 * 24 * 60 * 60 * 1000;
    const result = formatTimestamp(tenDaysAgo);
    expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/); // Date format
  });
});
