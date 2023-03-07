import { LogIn } from '../../components/log-in/log-in';

import './authorization-page.scss';

export const Authorization = () => {
  return (
    <section className='authorization-page'>
      <div className='container'>
        <h3>Cleverland</h3>
        <LogIn />
      </div>
    </section>
  );
};
