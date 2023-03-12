import { LogIn } from '../../../components/auth/log-in';

import '../auth.scss';

export const AuthorizationPage = () => {
  return (
    <main className='main' data-test-id='auth'>
      <section className='auth-page'>
        <div className='container'>
          <h3>Cleverland</h3>
          <LogIn />
        </div>
      </section>
    </main>
  );
};
