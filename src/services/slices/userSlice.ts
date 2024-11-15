import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export interface UserState {
  user: {
    name: string;
    email: string;
  };
  error: string | null;
  auth: boolean;
  orders: TOrder[];
  isAuthChecked: boolean;
  success: boolean;
  loading: boolean;
  loadingOrders: boolean;
}

const initialState: UserState = {
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

export const registerUser = createAsyncThunk(
  'user/register',
  async (regData: TRegisterData) => registerUserApi(regData)
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (logData: TLoginData) => {
    const data = await loginUserApi(logData);
    if (data.success) {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    return data;
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  const data = await logoutApi();
  if (data.success) {
    deleteCookie('accessToken');
    localStorage.clear();
  }
  return data;
});

export const getUser = createAsyncThunk('user/get', getUserApi);

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const getOrders = createAsyncThunk('user/orders', getOrdersApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = null;
        state.auth = false;
        state.isAuthChecked = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.auth = false;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.error = null;
        state.auth = true;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.auth = false;
        state.isAuthChecked = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.auth = false;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.error = null;
        state.auth = true;
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(logout.pending, (state) => {
        state.auth = true;
      })
      .addCase(logout.rejected, (state, action) => {
        console.log(action.error.message);
        state.auth = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.auth = false;
        state.user.name = '';
        state.user.email = '';
      })
      .addCase(getUser.pending, (state) => {
        state.auth = false;
        state.isAuthChecked = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        console.log(action.error.message);
        state.auth = false;
        state.isAuthChecked = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.auth = true;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        console.log(action.error.message);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
      })
      .addCase(getOrders.pending, (state) => {
        state.loadingOrders = true;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loadingOrders = false;
        console.log(action.error.message);
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loadingOrders = false;
        state.orders = action.payload;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectUserLoading: (state) => state.loading,
    selectOrdersLoading: (state) => state.loadingOrders,
    selectOrders: (state) => state.orders,
    selectSuccess: (state) => state.success,
    selectAuth: (state) => state.auth,
    selectAuthChecked: (state) => state.isAuthChecked,
    selectError: (state) => state.error
  }
});
export const {
  selectUser,
  selectUserLoading,
  selectOrders,
  selectSuccess,
  selectOrdersLoading,
  selectAuth,
  selectAuthChecked,
  selectError
} = userSlice.selectors;
export default userSlice.reducer;
