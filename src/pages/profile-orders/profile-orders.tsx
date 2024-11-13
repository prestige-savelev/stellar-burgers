import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import store, {
  RootState,
  useDispatch,
  useSelector
} from '../../services/store';
import { getOrders } from '../../services/slices/userSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const { orders, loading } = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
