import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { RootState, useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const { user } = useSelector((store: RootState) => store.user);
  return <AppHeaderUI userName={user.name} />;
};
