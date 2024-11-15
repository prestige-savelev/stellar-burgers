import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface FeedState {
  orders: TOrder[];
  feed: { total: number; totalToday: number };
  loading: boolean;
}

const initialState: FeedState = {
  orders: [],
  feed: {
    total: 0,
    totalToday: 0
  },
  loading: false
};

export const getFeed = createAsyncThunk('feedBurger/get', getFeedsApi);

export const feedSlice = createSlice({
  name: 'feedBurger',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error.message);
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
      });
  },
  selectors: {
    selectFeedLoading: (state) => state.loading,
    selectFeedOrders: (state) => state.orders,
    selectFeed: (state) => state.feed
  }
});
export const { selectFeedLoading, selectFeedOrders, selectFeed } = feedSlice.selectors;
export default feedSlice.reducer;
