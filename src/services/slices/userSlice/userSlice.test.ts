import { describe, test, expect } from '@jest/globals';
import userSlice, {
  getOrders,
  getUser,
  loginUser,
  logout,
  registerUser,
  updateUser
} from './userSlice';
import { getUserData, loginUserData, orderData } from '../testData';

describe('test reducers userSlice', () => {
  const initialState = {
    user: {
      name: '',
      email: ''
    },
    error: null,
    auth: false,
    orders: [],
    isAuthChecked: false,
    success: false,
    loading: false,
    loadingOrders: false
  };
  
  describe('test registerUser', () => {
    const actions = {
      pending: {
        type: registerUser.pending.type,
        payload: null
      },
      rejected: {
        type: registerUser.rejected.type,
        error: { message: 'error-message' }
      },
      fulfilled: {
        type: registerUser.fulfilled.type,
        payload: null
      }
    };
    test('test registerUser.pending', () => {
      const state = userSlice(initialState, actions.pending);
      expect(state.error).toBe(null);
      expect(state.auth).toBe(false);
      expect(state.isAuthChecked).toBe(false);
    });
    test('test registerUser.rejected', () => {
      const state = userSlice(initialState, actions.rejected);
      expect(state.error).toBe(actions.rejected.error.message as string);
      expect(state.auth).toBe(false);
      expect(state.isAuthChecked).toBe(true);
    });
    test('test registerUser.fulfilled', () => {
      const state = userSlice(initialState, actions.fulfilled);
      expect(state.error).toBe(null);
      expect(state.auth).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });
  });
  describe('test loginUser', () => {
    const actions = {
      pending: {
        type: loginUser.pending.type,
        payload: null
      },
      rejected: {
        type: loginUser.rejected.type,
        error: { message: 'error-message' }
      },
      fulfilled: {
        type: loginUser.fulfilled.type,
        payload: loginUserData
      }
    };
    test('test loginUser.pending', () => {
      const state = userSlice(initialState, actions.pending);
      expect(state.error).toBe(null);
      expect(state.auth).toBe(false);
      expect(state.isAuthChecked).toBe(false);
    });
    test('test loginUser.rejected', () => {
      const state = userSlice(initialState, actions.rejected);
      expect(state.error).toBe(actions.rejected.error.message as string);
      expect(state.auth).toBe(false);
      expect(state.isAuthChecked).toBe(true);
    });
    test('test loginUser.fulfilled', () => {
      const state = userSlice(initialState, actions.fulfilled);
      expect(state.error).toBe(null);
      expect(state.auth).toBe(true);
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toBe(actions.fulfilled.payload.user);
    });
  });
  describe('test logout', () => {
    const actions = {
      pending: {
        type: logout.pending.type,
        payload: null
      },
      rejected: {
        type: logout.rejected.type,
        error: { message: 'error-message' }
      },
      fulfilled: {
        type: logout.fulfilled.type,
        payload: null
      }
    };
    test('test logout.pending', () => {
      const state = userSlice(initialState, actions.pending);
      expect(state.auth).toBe(true);
    });
    test('test logout.rejected', () => {
      const state = userSlice(initialState, actions.rejected);
      expect(state.auth).toBe(true);
    });
    test('test logout.fulfilled', () => {
      const state = userSlice(initialState, actions.fulfilled);
      expect(state.auth).toBe(false);
      expect(state.user.name).toBe('');
      expect(state.user.email).toBe('');
    });
  });
  describe('test getUser', () => {
    const actions = {
      pending: {
        type: getUser.pending.type,
        payload: null
      },
      rejected: {
        type: getUser.rejected.type,
        error: { message: 'error-message' }
      },
      fulfilled: {
        type: getUser.fulfilled.type,
        payload: getUserData
      }
    };
    test('test getUser.pending', () => {
      const state = userSlice(initialState, actions.pending);
      expect(state.auth).toBe(false);
      expect(state.isAuthChecked).toBe(false);
    });
    test('test getUser.rejected', () => {
      const state = userSlice(initialState, actions.rejected);
      expect(state.auth).toBe(false);
      expect(state.isAuthChecked).toBe(true);
    });
    test('test getUser.fulfilled', () => {
      const state = userSlice(initialState, actions.fulfilled);
      expect(state.auth).toBe(true);
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toBe(actions.fulfilled.payload.user);
    });
  });
  describe('test updateUser', () => {
    const actions = {
      pending: {
        type: updateUser.pending.type,
        payload: null
      },
      rejected: {
        type: updateUser.rejected.type,
        error: { message: 'error-message' }
      },
      fulfilled: {
        type: updateUser.fulfilled.type,
        payload: getUserData
      }
    };
    test('test updateUser.pending', () => {
      const state = userSlice(initialState, actions.pending);
      expect(state.loading).toBe(true);
      expect(state.success).toBe(false);
    });
    test('test updateUser.rejected', () => {
      const state = userSlice(initialState, actions.rejected);
      expect(state.loading).toBe(false);
      expect(state.success).toBe(false);
    });
    test('test updateUser.fulfilled', () => {
      const state = userSlice(initialState, actions.fulfilled);
      expect(state.loading).toBe(false);
      expect(state.success).toBe(true);
      expect(state.user).toBe(actions.fulfilled.payload.user);
    });
  });
  describe('test getOrders', () => {
    const actions = {
      pending: {
        type: getOrders.pending.type,
        payload: null
      },
      rejected: {
        type: getOrders.rejected.type,
        error: { message: 'error-message' }
      },
      fulfilled: {
        type: getOrders.fulfilled.type,
        payload: [orderData]
      }
    };
    test('test getOrders.pending', () => {
      const state = userSlice(initialState, actions.pending);
      expect(state.loadingOrders).toBe(true);
    });
    test('test getOrders.rejected', () => {
      const state = userSlice(initialState, actions.rejected);
      expect(state.loadingOrders).toBe(false);
    });
    test('test getOrders.fulfilled', () => {
      const state = userSlice(initialState, actions.fulfilled);
      expect(state.loadingOrders).toBe(false);
      expect(state.orders).toBe(actions.fulfilled.payload);
    });
  });
});
