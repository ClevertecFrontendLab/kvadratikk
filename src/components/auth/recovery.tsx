import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { setIsLoading } from '../../store/slices/loading-slice';
import { AppDispatch, RootState } from '../../store/store';

import { ForgotPassword } from './forgot-password';
import { ResetPassword } from './reset-password';

import './auth.scss';

export const Recovery = () => {
  const { search } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.recovery);

  useEffect(() => {
    if (loading === 'pending') dispatch(setIsLoading(true));
    if (loading === 'failed') dispatch(setIsLoading(false));
    if (loading === 'succeeded') dispatch(setIsLoading(false));
  }, [dispatch, loading]);

  if (search) return <ResetPassword />;

  return <ForgotPassword />;
};
