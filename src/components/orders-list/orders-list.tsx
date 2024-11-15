import { FC, memo } from 'react';

import { OrdersListProps } from './type';
import { OrdersListUI, Preloader } from '@ui';

export const OrdersList: FC<OrdersListProps> = memo(({ orders, loading }) => {
  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (loading) {
    return <Preloader />;
  }

  return <OrdersListUI orderByDate={orderByDate} />;
});
