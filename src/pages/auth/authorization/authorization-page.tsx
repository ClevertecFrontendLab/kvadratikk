import { LogIn } from '../../../components/auth/log-in';

import '../auth.scss';

export const AuthorizationPage = () => {
  return (
    <section className='authorization-page'>
      <div className='container'>
        <h3>Cleverland</h3>
        <LogIn />
      </div>
    </section>
  );
};
