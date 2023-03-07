import { Navigate, Route, Routes } from 'react-router-dom';

import { AgreementPage } from '../../pages/agreement/agreement-page';
import { Authorization } from '../../pages/authorization/authorization-page';
import { BookPage } from '../../pages/book/book-page';
import { MainPage } from '../../pages/main/main-page';
import { Registration } from '../../pages/registration/registration-page';
import { TermsPage } from '../../pages/terms/terms-page';

export const RoutesList = () => {
  const user = false;

  return (
    <Routes>
      <Route path='/' element={<Navigate to={user ? '/books/all' : '/authorization'} />} />
      <Route path='/authorization' element={<Authorization />} />
      <Route path='/registration' element={<Registration />} />
      <Route path='/agreement' element={<AgreementPage />} />
      <Route path='/terms' element={<TermsPage />} />
      <Route path='/books/:category' element={<MainPage />} />
      <Route path='/books/:category/:id' element={<BookPage />} />
    </Routes>
  );
};
