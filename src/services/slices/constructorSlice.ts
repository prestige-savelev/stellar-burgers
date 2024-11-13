import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { getIngredientsApi, orderBurgerApi } from '@api';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export interface ConstructorState {
  isIngredientsLoading: boolean;
  ingredients: TIngredient[];
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  burgerConstructor: {
    bun: TConstructorIngredient | null;
    ingredients: TIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
}

const initialState: ConstructorState = {
  isIngredientsLoading: false,
  ingredients: [],
  constructorItems: {
    bun: null,
    ingredients: []
  },
  burgerConstructor: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  buns: [],
  mains: [],
  sauces: []
};

export const getIngredients = createAsyncThunk(
  'burger/ingredients',
  getIngredientsApi
);

export const orderBurger = createAsyncThunk(
  'burger/order',
  async (data: string[]) => orderBurgerApi(data)
);

export const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addIngredients: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
          state.burgerConstructor.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
          state.burgerConstructor.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredients: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (i) => i.id !== action.payload.id
        );
      state.burgerConstructor.ingredients =
        state.constructorItems.ingredients.filter(
          (i) => i.id !== action.payload.id
        );
    },
    resetOrder: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        console.log(action.error.message);
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
        state.buns = action.payload.filter((i) => i.type === 'bun');
        state.mains = action.payload.filter((i) => i.type === 'main');
        state.sauces = action.payload.filter((i) => i.type === 'sauce');
      })
      .addCase(orderBurger.pending, (state) => {
        state.isIngredientsLoading = true;
        state.orderRequest = false;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.isIngredientsLoading = true;
        state.orderRequest = false;
        console.log(action.error.message as string);
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.orderRequest = true;
        state.orderModalData = action.payload.order;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
        state.burgerConstructor = {
          bun: null,
          ingredients: []
        };
      });
  }
});

export const { addIngredients, removeIngredients, resetOrder } = constructorSlice.actions;
export default constructorSlice.reducer;
