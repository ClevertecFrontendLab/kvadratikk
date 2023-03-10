import { SignIn } from '../../../components/auth/sign-in';

import '../auth.scss';

export const RegistrationPage = () => {
  return (
    <section className='registration-page'>
      <div className='container container-auth'>
        <h3>Cleverland</h3>
        <SignIn />
      </div>
    </section>
  );
};
