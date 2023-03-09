import { FC, Fragment, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';

import { Error } from '../../components/error/error';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Menu } from '../../components/menu/menu';
import { RootState } from '../../store/store';

export const PageWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { isError } = useSelector((state: RootState) => state.loading);

  return (
    <Fragment>
      <Header />
      <main className='main'>
        {isError && <Error />}
        <div className='container menu-mobile'>
          <Menu isBurgerMenu={true} />
        </div>
        {children}
      </main>
      <Footer />
    </Fragment>
  );
};
