import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthorizationPage } from '../../pages/auth/authorization/authorization-page';
import { RecoveryPage } from '../../pages/auth/recovery/recovery-page';
import { RegistrationPage } from '../../pages/auth/registration/registration-page';
import { BookPage } from '../../pages/book/book-page';
import { MainPage } from '../../pages/main/main-page';
import { PageWrapper } from '../../pages/page-wrapper/page-wrapper';
import { AgreementPage } from '../../pages/rules/agreement/agreement-page';
import { TermsPage } from '../../pages/rules/terms/terms-page';
import { RootState } from '../../store/store';

export const RoutesList = () => {
  const { jwt } = useSelector((state: RootState) => state.authorization);

  const pageWrapper = (page: ReactNode) => <PageWrapper>{page}</PageWrapper>;

  const redirectWithoutJwt = (element: JSX.Element) => {
    return jwt ? element : <Navigate to='/auth' />;
  };
  const redirectWithJwt = (element: JSX.Element) => {
    return jwt ? <Navigate to='/books/all' /> : element;
  };

  return (
    <Routes>
      <Route path='/' element={<Navigate to={jwt ? '/books/all' : '/auth'} />} />
      <Route path='/auth' element={redirectWithJwt(<AuthorizationPage />)} />
      <Route path='/registration' element={redirectWithJwt(<RegistrationPage />)} />
      <Route path='/forgot-pass' element={redirectWithJwt(<RecoveryPage />)} />
      <Route path='/agreement' element={redirectWithoutJwt(pageWrapper(<AgreementPage />))} />
      <Route path='/terms' element={redirectWithoutJwt(pageWrapper(<TermsPage />))} />
      <Route path='/books/:category' element={redirectWithoutJwt(pageWrapper(<MainPage />))} />
      <Route path='/books/:category/:id' element={redirectWithoutJwt(pageWrapper(<BookPage />))} />
    </Routes>
  );
};
