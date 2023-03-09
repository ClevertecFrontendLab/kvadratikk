import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AgreementPage } from '../../pages/agreement/agreement-page';
import { Authorization } from '../../pages/authorization/authorization-page';
import { BookPage } from '../../pages/book/book-page';
import { MainPage } from '../../pages/main/main-page';
import { PageWrapper } from '../../pages/page-wrapper/page-wrapper';
import { Registration } from '../../pages/registration/registration-page';
import { TermsPage } from '../../pages/terms/terms-page';
import { RootState } from '../../store/store';

const pageWrapper = (page: ReactNode) => <PageWrapper>{page}</PageWrapper>;

export const RoutesList = () => {
  const { jwt } = useSelector((state: RootState) => state.authorization);

  const redirectWithoutJwt = (element: JSX.Element) => {
    return jwt ? element : <Navigate to='/auth' />;
  };

  const redirectWithJwt = (element: JSX.Element) => {
    return jwt ? <Navigate to='/books/all' /> : element;
  };

  return (
    <Routes>
      <Route path='/' element={<Navigate to={jwt ? '/books/all' : '/auth'} />} />
      <Route path='/auth' element={redirectWithJwt(<Authorization />)} />
      <Route path='/registration' element={redirectWithJwt(<Registration />)} />
      <Route path='/agreement' element={redirectWithoutJwt(pageWrapper(<AgreementPage />))} />
      <Route path='/terms' element={redirectWithoutJwt(pageWrapper(<TermsPage />))} />
      <Route path='/books/:category' element={redirectWithoutJwt(pageWrapper(<MainPage />))} />
      <Route path='/books/:category/:id' element={redirectWithoutJwt(pageWrapper(<BookPage />))} />
    </Routes>
  );
};
