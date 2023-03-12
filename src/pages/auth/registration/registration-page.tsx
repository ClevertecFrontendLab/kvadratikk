import { SignIn } from '../../../components/auth/sign-in';

import '../auth.scss';

export const RegistrationPage = () => {
  return (
    <main className='main' data-test-id='auth'>
      <section className='auth-page'>
        <div className='container container-auth'>
          <h3>Cleverland</h3>
          <SignIn />
        </div>
      </section>
    </main>
  );
};
