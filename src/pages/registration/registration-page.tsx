import { SignIn } from '../../components/log-in/sign-in';

import '../authorization/authorization-page.scss';

export const Registration = () => {
  return (
    <section className='registration-page'>
      <div className='container'>
        <h3>Cleverland</h3>
        <SignIn />
      </div>
    </section>
  );
};
