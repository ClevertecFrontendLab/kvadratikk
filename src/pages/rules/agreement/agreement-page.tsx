import { Menu } from '../../../components/menu/menu';
import { Rules } from '../rules';

import '../rules.scss';

export const AgreementPage = () => (
  <section className='agreement-page'>
    <div className='container'>
      <Menu />
      <div>
        <h3>Договор оферты</h3>
        <Rules />
      </div>
    </div>
  </section>
);
