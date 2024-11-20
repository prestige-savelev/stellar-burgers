import { describe, test, expect } from '@jest/globals';
import orderSlice, { getOrderByNumber, initialState } from './orderSlice';
import { numberOrderData } from '../testData';

describe('test reducers orderSlice', () => {
  describe('test getOrderByNumber', () => {
    const actions = {
      fulfilled: {
        type: getOrderByNumber.fulfilled.type,
        payload: numberOrderData
      }
    };
    test('test getOrderByNumber.fulfilled', () => {
      const state = orderSlice(initialState, actions.fulfilled);
      expect(state.orderData).toBe(actions.fulfilled.payload.orders[0]);
    });
  });
});
