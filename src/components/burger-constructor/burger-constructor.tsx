import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {  useDispatch, useSelector } from '../../services/store';
import {
  orderBurger,
  resetOrder,
  selectConstructorItems,
  selectOrderModalData,
  selectOrderRequest
} from '../../services/slices/constructorSlice';
import { useNavigate } from 'react-router-dom';
import { selectAuth } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);

  const auth = useSelector(selectAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) {
      return;
    }
    if (!auth) {
      navigate('/login');
      return;
    }
    const bunsId = constructorItems.bun?._id;
    const ingredientsId = constructorItems.ingredients.map(
      (ingredient) => ingredient._id
    );
    const ingredients: string[] = [bunsId, bunsId, ...ingredientsId];
    dispatch(orderBurger(ingredients));
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
