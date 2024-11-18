import { describe, test, expect } from '@jest/globals';
import store, { rootReducer } from './store';

describe('Initialization rootReducer', () => {
  test('Initialization the state correctly', () => {
    const initAction = { type: '@@INIT' };
    const initialState = store.getState();
    const state = rootReducer(undefined, initAction);
    expect(state).toEqual(initialState);
  });
});
