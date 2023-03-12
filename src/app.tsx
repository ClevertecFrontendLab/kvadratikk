import { useSelector } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { Loader } from './components/loader/loader';
import { RoutesList } from './components/routes/routes';
import { RootState } from './store/store';

export const App = () => {
  const { isLoading } = useSelector((state: RootState) => state.loading);

  return (
    <HashRouter>
      {isLoading && <Loader />}
      <RoutesList />
    </HashRouter>
  );
};
