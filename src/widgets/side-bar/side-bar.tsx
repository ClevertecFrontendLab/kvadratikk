import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalNoReview } from '@components/modal-no-reviews';
import { useLogout } from '@hooks/use-logout';
import { useLazyGetUserTrainingQuery } from '@redux/serviсes/training.ts';
import { Paths } from '@routes/paths.ts';
import logoCollapsed from '@shared/assets/icons/logo-collapsed.svg';
import logoFull from '@shared/assets/icons/logo-full.svg';
import { CollapseSwitcher } from '@shared/components/collapse-switcher';
import { navigateAfterRequest } from '@utils/navigate-after-request.ts';
import { Button, Divider, Layout } from 'antd';
import classNames from 'classnames';

import { MENU_ITEM_EXIT, MENU_ITEMS } from './config/menu-items';

import styles from './side-bar.module.css';

const { Sider } = Layout;

type SideBarProps = {
    collapsed: boolean;
    toggleMenu: () => void;
};

export const SideBar: FC<SideBarProps> = ({ collapsed, toggleMenu }) => {
    const navigate = useNavigate();
    const logout = useLogout();
    const [getUserTraining, { isError }] = useLazyGetUserTrainingQuery();

    const onNavigate = async (route: string) => {
        await navigateAfterRequest(
            navigate,
            getUserTraining,
            [`${Paths.AUTH}${Paths.CALENDAR}`],
            route,
        );
    };

    return (
        <Sider
            className={styles.sideBar}
            collapsible={true}
            trigger={null}
            collapsed={collapsed}
            collapsedWidth='64px'
            width='208px'
        >
            <div
                className={classNames(styles.upperBlock, {
                    [styles.upperBlockCollapsed]: collapsed,
                })}
            >
                <div className={styles.imageContainer}>
                    <img
                        alt='CleverFit'
                        src={collapsed ? logoCollapsed : logoFull}
                        className={styles.logo}
                    />
                </div>
                {MENU_ITEMS.map(({ id, icon, title, route, dataTestId }) => (
                    <Button
                        type='text'
                        key={id}
                        className={styles.menuButton}
                        data-test-id={dataTestId}
                        onClick={() => onNavigate(route)}
                    >
                        <img alt='icon' src={icon} />
                        {!collapsed && <span>{title}</span>}
                    </Button>
                ))}
            </div>
            <div>
                <Divider className={styles.divider} />
                <Button
                    type='text'
                    className={classNames(styles.menuButton, styles.exitButton, {
                        [styles.collapsedButton]: collapsed,
                    })}
                    onClick={logout}
                >
                    <img alt='icon' src={MENU_ITEM_EXIT.icon} />
                    {!collapsed && <span>{MENU_ITEM_EXIT.title}</span>}
                </Button>
            </div>
            <CollapseSwitcher
                dataTestId='sider-switch'
                outerClass={styles.switcherPosition}
                collapsed={collapsed}
                toggleMenu={toggleMenu}
                isDesktop={true}
            />
            <ModalNoReview open={isError} />
        </Sider>
    );
};
