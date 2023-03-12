import { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Close } from '../../assets/icons/close.svg';
import menu from '../../assets/icons/menu.svg';
import avatar from '../../assets/images/avatar.png';
import logo from '../../assets/images/logo-big.png';
import { logout } from '../../store/slices/authorization-slice';
import { setIsExpandedMenu } from '../../store/slices/menu-slice';
import { RootState } from '../../store/store';

import './header.scss';

export const Header = () => {
  const dispatch = useDispatch();
  const isExpandedMenu = useSelector((state: RootState) => state.menu.isExpandedMenu);
  const [isExpandedProfile, setIsExpandedProfile] = useState(false);

  const handleBurgerClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    dispatch(setIsExpandedMenu(!isExpandedMenu));
  };

  const handleProfileClick = () => {
    setIsExpandedProfile(!isExpandedProfile);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <header className='header'>
      <div className='container'>
        <NavLink to='/books/all'>
          <img className='logo' src={logo} alt='logo' />
        </NavLink>

        <button data-test-id='button-burger' type='button' className='header__nav' onClick={handleBurgerClick}>
          {isExpandedMenu ? <Close /> : <img src={menu} alt='menu' />}
        </button>

        <h3>Библиотека</h3>

        <div className='profile'>
          <button type='button' className='profile__button' onClick={handleProfileClick}>
            <span>Привет, Иван!</span>
            <img src={avatar} alt='avatar' />
          </button>

          <ul className={`profile__options ${isExpandedProfile ? 'visible' : ''}`}>
            <li>
              <NavLink to='auth'>
                <h5>Профиль</h5>
              </NavLink>
            </li>
            <li>
              <NavLink to='auth' onClick={handleLogoutClick}>
                <h5>Выход</h5>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
