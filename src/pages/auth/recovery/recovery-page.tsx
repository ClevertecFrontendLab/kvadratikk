import { Recovery } from '../../../components/auth/recovery';

import '../auth.scss';

export const RecoveryPage = () => {
  return (
    <section className='registration-page'>
      <div className='container container-auth'>
        <h3>Cleverland</h3>
        <Recovery />
      </div>
    </section>
  );
};
