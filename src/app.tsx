import { useSelector } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { Error } from './components/error/error';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Gradient } from './components/icons/gradient';
import { Loader } from './components/loader/loader';
import { Menu } from './components/menu/menu';
import { RoutesList } from './components/routes/routes';
import { RootState } from './store/store';

export const App = () => {
  const { isLoading, isError } = useSelector((state: RootState) => state.loading);

  return (
    <HashRouter>
      <Gradient />
      <Header />
      <main className='main'>
        {isLoading && <Loader />}
        {isError && <Error />}
        <div className='container menu-mobile'>
          <Menu isBurgerMenu={true} />
        </div>
        <RoutesList />
      </main>
      <Footer />
    </HashRouter>
  );
};
