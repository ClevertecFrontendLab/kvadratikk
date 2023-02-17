import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import menu from '../../assets/icons/menu.svg';
import avatar from '../../assets/images/avatar.png';
import logo from '../../assets/images/logo-big.png';
import { setIsExpandedMenu } from '../../store/slices/menu-slice';
import { RootState } from '../../store/store';
import { Close } from '../icons/close';

import './header.scss';

export const Header = () => {
  const dispatch = useDispatch();
  const isExpandedMenu = useSelector((state: RootState) => state.menu.isExpandedMenu);

  return (
    <header className='header'>
      <div className='container'>
        <NavLink to='/books/all'>
          <img className='logo' src={logo} alt='logo' />
        </NavLink>

        <button
          data-test-id='button-burger'
          type='button'
          className='header__nav'
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setIsExpandedMenu(!isExpandedMenu));
          }}
        >
          {isExpandedMenu ? <Close /> : <img src={menu} alt='menu' />}
        </button>

        <h3>Библиотека</h3>

        <div className='profile'>
          <span>Привет, Иван!</span>
          <img src={avatar} alt='avatar' />
        </div>
      </div>
    </header>
  );
};
