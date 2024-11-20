import { describe, test, expect } from '@jest/globals';
import feedSlice, { getFeed, initialState } from './feedSlice';
import { feedData } from '../testData';

describe('test reducers feedSlice', () => {
  describe('test getFeed', () => {
    const actions = {
      pending: {
        type: getFeed.pending.type,
        payload: null
      },
      rejected: {
        type: getFeed.rejected.type,
        error: { message: 'error-message' }
      },
      fulfilled: {
        type: getFeed.fulfilled.type,
        payload: feedData
      }
    };
    test('test getFeed.pending', () => {
      const state = feedSlice(initialState, actions.pending);
      expect(state.loading).toBe(true);
    });
    test('test getFeed.rejected', () => {
      const state = feedSlice(initialState, actions.rejected);
      expect(state.loading).toBe(false);
    });
    test('test getFeed.fulfilled', () => {
      const state = feedSlice(initialState, actions.fulfilled);
      expect(state.loading).toBe(false);
      expect(state.orders).toBe(actions.fulfilled.payload.orders);
      expect(state.feed.total).toBe(actions.fulfilled.payload.total);
      expect(state.feed.totalToday).toBe(actions.fulfilled.payload.totalToday);
    });
  });
});
