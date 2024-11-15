import { FC } from 'react';

import styles from './profile-orders.module.css';

import { ProfileOrdersUIProps } from './type';
import { ProfileMenu, OrdersList } from '@components';
import { useSelector } from '../../../../services/store';
import { selectOrdersLoading } from '../../../../services/slices/userSlice';

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({ orders }) => {
  const loading = useSelector(selectOrdersLoading);

  return (
    <main className={`${styles.main}`}>
      <div className={`mt-30 mr-15 ${styles.menu}`}>
        <ProfileMenu />
      </div>
      <div className={`mt-10 ${styles.orders}`}>
        <OrdersList orders={orders} loading={loading} />
      </div>
    </main>
  );
};
