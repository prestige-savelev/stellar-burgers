import { describe, test, expect } from '@jest/globals';
import constructorSlice, {
  addIngredients,
  getIngredients,
  initialState,
  orderBurger,
  removeIngredients,
  resetOrder
} from './constructorSlice';
import { bunData, ingredientData, orderData } from '../testData';

describe('Test reducers constructorSlice', () => {
  describe('test addIngredients', () => {
    test('test addIngredients on bun', () => {
      const testState = constructorSlice(
        initialState,
        addIngredients(bunData)
      );
      expect(testState.constructorItems.bun).toEqual({
        ...bunData,
        id: expect.any(String)
      });
    }),
      test('test addIngredients on ingredients', () => {
        const testState = constructorSlice(
          initialState,
          addIngredients(ingredientData)
        );
        expect(testState.constructorItems.ingredients[0]).toEqual({
          ...ingredientData,
          id: expect.any(String)
        });
      });
  });
  describe('test removeIngredients', () => {
    const initialStates = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [{ id: 'generate', ...ingredientData }]
      }
    };
    test('test removeIngredients on delete', () => {
      const testState = constructorSlice(
        initialStates,
        removeIngredients({ id: 'generate', ...ingredientData })
      );
      expect(testState).toEqual({
        ...initialStates,
        constructorItems: {
          bun: null,
          ingredients: []
        }
      });
    });
  });
  describe('test resetOrder', () => {
    const initialStates = {
      ...initialState,
      orderRequest: true,
      orderModalData: orderData
    };
    test('test resetOrder on reset', () => {
      const testState = constructorSlice(initialStates, resetOrder());
      expect(testState).toEqual({
        ...initialStates,
        orderRequest: false,
        orderModalData: null
      });
    });
  });
  describe('test getIngredients', () => {
    const actions = {
      pending: {
        type: getIngredients.pending.type,
        payload: null
      },
      rejected: {
        type: getIngredients.rejected.type,
        error: { message: 'error-message' }
      },
      fulfilled: {
        type: getIngredients.fulfilled.type,
        payload: [ingredientData, bunData]
      }
    };
    test('test getIngredients.pending', () => {
      const state = constructorSlice(initialState, actions.pending);
      expect(state.isIngredientsLoading).toBe(true);
    });
    test('test getIngredients.rejected', () => {
      const state = constructorSlice(initialState, actions.rejected);
      expect(state.isIngredientsLoading).toBe(false);
    });
    test('test getIngredients.fulfilled', () => {
      const state = constructorSlice(initialState, actions.fulfilled);
      expect(state.isIngredientsLoading).toBe(false);
      expect(state.ingredients).toBe(actions.fulfilled.payload);
      expect(state.buns).toEqual(
        actions.fulfilled.payload.filter((i) => i.type === 'bun')
      );
      expect(state.mains).toEqual(
        actions.fulfilled.payload.filter((i) => i.type === 'main')
      );
      expect(state.sauces).toEqual(
        actions.fulfilled.payload.filter((i) => i.type === 'sauce')
      );
    });
  });
  describe('test orderBurger', () => {
    const actions = {
      pending: {
        type: orderBurger.pending.type,
        payload: null
      },
      rejected: {
        type: orderBurger.rejected.type,
        error: { message: 'error-message' }
      },
      fulfilled: {
        type: orderBurger.fulfilled.type,
        payload: { order: orderData }
      }
    };
    test('test orderBurger.pending', () => {
      const state = constructorSlice(initialState, actions.pending);
      expect(state.isIngredientsLoading).toBe(true);
      expect(state.orderRequest).toBe(true);
    });
    test('test orderBurger.rejected', () => {
      const state = constructorSlice(initialState, actions.rejected);
      expect(state.isIngredientsLoading).toBe(false);
      expect(state.orderRequest).toBe(true);
    });
    test('test orderBurger.fulfilled', () => {
      const state = constructorSlice(initialState, actions.fulfilled);
      expect(state.isIngredientsLoading).toBe(false);
      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toBe(actions.fulfilled.payload.order);
      expect(state.constructorItems).toEqual({ bun: null, ingredients: [] });
    });
  });
});
