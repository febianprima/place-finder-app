import { describe, it, expect } from 'vitest';
import { createHistoryItem } from '@/utils';

describe('createHistoryItem', () => {
  it('should create a history item with all required fields', () => {
    const place: Place = {
      id: 'test-id',
      name: 'Test Place',
      formattedAddress: '123 Test St',
      location: { lat: 1.0, lng: 2.0 },
    };

    const item = createHistoryItem(place, 'test query');

    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('query', 'test query');
    expect(item).toHaveProperty('place', place);
    expect(item).toHaveProperty('timestamp');
    expect(typeof item.timestamp).toBe('number');
  });

  it('should generate unique IDs', () => {
    const place: Place = {
      id: 'test-id',
      name: 'Test Place',
      formattedAddress: '123 Test St',
      location: { lat: 1.0, lng: 2.0 },
    };

    const item1 = createHistoryItem(place, 'query 1');
    const item2 = createHistoryItem(place, 'query 2');

    expect(item1.id).not.toBe(item2.id);
  });
});
