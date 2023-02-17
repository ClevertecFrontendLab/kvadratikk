import facebook from '../../assets/icons/facebook.svg';
import inst from '../../assets/icons/inst.svg';
import linkdin from '../../assets/icons/linkdin.svg';
import vk from '../../assets/icons/vk.svg';

import './footer.scss';

export const Footer = () => (
  <footer className='footer'>
    <div className='container'>
      <div className='footer__wrapper'>
        <span>© 2020-2023 Cleverland. Все права защищены.</span>
        <div className='footer__social'>
          <a href='https://www.facebook.com/' target='_blank' rel='noreferrer'>
            <img src={facebook} alt='facebook' />
          </a>
          <a href='https://www.instagram.com/' target='_blank' rel='noreferrer'>
            <img src={inst} alt='inst' />
          </a>
          <a href='https://vk.com/' target='_blank' rel='noreferrer'>
            <img src={vk} alt='vk' />
          </a>
          <a href='https://www.linkedin.com/' target='_blank' rel='noreferrer'>
            <img src={linkdin} alt='linkdin' />
          </a>
        </div>
      </div>
    </div>
  </footer>
);
