import { Menu } from '../../components/menu/menu';
import { Rules } from '../agreement/rules';

import '../agreement/agreement-page';

export const TermsPage = () => (
  <section className='terms-page'>
    <div className='container'>
      <Menu />
      <div>
        <h3>Правила пользования</h3>
        <Rules />
      </div>
    </div>
  </section>
);
