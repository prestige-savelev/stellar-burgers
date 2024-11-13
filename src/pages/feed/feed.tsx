import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from '../../services/store';
import { getFeed } from '../../services/slices/feedSlice';
import { RootState } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const { orders } = useSelector((store: RootState) => store.feedBurger);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeed());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeed())} />;
};
