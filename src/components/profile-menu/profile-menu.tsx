import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logout } from '../../services/slices/userSlice';

export const ProfileMenu: FC = memo(() => {
  const { pathname } = useLocation();
  const dispath = useDispatch();

  const handleLogout = () => {
    dispath(logout());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
});
