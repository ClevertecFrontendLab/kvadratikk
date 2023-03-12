import { Recovery } from '../../../components/auth/recovery';

import '../auth.scss';

export const RecoveryPage = () => {
  return (
    <main className='main' data-test-id='auth'>
      <section className='auth-page'>
        <div className='container container-auth'>
          <h3>Cleverland</h3>
          <Recovery />
        </div>
      </section>
    </main>
  );
};
