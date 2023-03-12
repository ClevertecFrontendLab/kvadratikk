import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

import { logout } from '../../store/slices/authorization-slice';
import { setIsExpandedMenu } from '../../store/slices/menu-slice';
import { RootState } from '../../store/store';

import { Books } from './books/books';

import './menu.scss';

export const Menu = ({ isBurgerMenu }: { isBurgerMenu?: boolean }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const menuRef = useRef(null);

  const isExpandedMenu = useSelector((state: RootState) => state.menu.isExpandedMenu);

  document.body.addEventListener('click', (e: MouseEvent) => {
    if (menuRef.current && e.target !== menuRef.current) dispatch(setIsExpandedMenu(false));
  });

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <nav
      data-test-id={isBurgerMenu ? 'burger-navigation' : ''}
      className={`menu ${isExpandedMenu ? 'visible' : ''}`}
      ref={menuRef}
      aria-hidden='true'
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <ul className='menu__list'>
        <Books isBurgerMenu={isBurgerMenu} />
        <li>
          <NavLink
            data-test-id={isBurgerMenu ? 'burger-terms' : 'navigation-terms'}
            to='/terms'
            onClick={() => {
              dispatch(setIsExpandedMenu(false));
            }}
          >
            <h5 className={pathname === '/terms' ? 'active' : ''}>Правила пользования</h5>
          </NavLink>
        </li>
        <li>
          <NavLink
            data-test-id={isBurgerMenu ? 'burger-contract' : 'navigation-contract'}
            to='/agreement'
            onClick={() => {
              dispatch(setIsExpandedMenu(false));
            }}
          >
            <h5 className={pathname === '/agreement' ? 'active' : ''}>Договор оферты</h5>
          </NavLink>
        </li>
        {isExpandedMenu && (
          <div className='menu__profile'>
            <li>
              <NavLink to='/auth'>
                <h5>Профиль</h5>
              </NavLink>
            </li>
            <li data-test-id={isBurgerMenu ? 'exit-button' : ''}>
              <NavLink to='/auth' onClick={handleLogoutClick}>
                <h5>Выход</h5>
              </NavLink>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};
