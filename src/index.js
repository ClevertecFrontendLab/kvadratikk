/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux/es/exports';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Gradient } from './components/icons/gradient';
import { Menu } from './components/menu/menu';
import { AgreementPage } from './pages/agreement/agreement-page';
import { BookPage } from './pages/book/book-page';
import { MainPage } from './pages/main/main-page';
import { TermsPage } from './pages/terms/terms-page';
import { store } from './store/store';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Gradient />
        <Header />
        <main className='main'>
          <div className='container menu-mobile'>
            <Menu isBurgerMenu={true} />
          </div>
          <Routes>
            <Route path='/' element={<Navigate to='/books/all' />} />
            <Route path='/agreement' element={<AgreementPage />} />
            <Route path='/terms' element={<TermsPage />} />
            <Route path='/books/:category' element={<MainPage />} />
            <Route path='/books/:category/:id' element={<BookPage />} />
          </Routes>
        </main>
        <Footer />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
