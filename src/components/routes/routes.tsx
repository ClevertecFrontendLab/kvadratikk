import { Navigate, Route, Routes } from 'react-router-dom';

import { AgreementPage } from '../../pages/agreement/agreement-page';
import { BookPage } from '../../pages/book/book-page';
import { MainPage } from '../../pages/main/main-page';
import { TermsPage } from '../../pages/terms/terms-page';

export const RoutesList = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/books/all' />} />
      <Route path='/agreement' element={<AgreementPage />} />
      <Route path='/terms' element={<TermsPage />} />
      <Route path='/books/:category' element={<MainPage />} />
      <Route path='/books/:category/:id' element={<BookPage />} />
    </Routes>
  );
};
