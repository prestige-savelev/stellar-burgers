import { getOrderByNumberApi} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface OrderState {
  orderData: TOrder | null;
}

const initialState: OrderState = {
  orderData: null
};

export const getOrderByNumber = createAsyncThunk(
  'order/getNumber',
  async (number: number) => getOrderByNumberApi(number)
);

export const orderSlice = createSlice({
  name: 'orderBurger',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderData = action.payload.orders[0];
      });
  }
});

export default orderSlice.reducer;
