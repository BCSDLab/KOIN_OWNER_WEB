import { ReactComponent as LogoIcon } from 'assets/svg/common/koin-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORY_COOP, CATEGORY_OWNER, HeaderCategory } from 'utils/constant/category';
import cn from 'utils/ts/className';
import { useLogout } from 'query/auth';
import usePrevPathStore from 'store/path';
import useMegaMenu from 'component/common/Header/hooks/useMegaMenu';
import useUserTypeStore from 'store/useUserTypeStore';
import styles from './PCPanel.module.scss';

const ID: { [key: string]: string; } = {
  PANEL: 'mega-menu-panel',
  LABEL1: 'mega-menu-label-1',
  LABEL2: 'mega-menu-label-2',
};

interface Prop {
  categoryArray: HeaderCategory[];
}

function HeaderContent({ categoryArray }: Prop) {
  const {
    panelMenuList,
    isExpanded: isMegaMenuExpanded,
    createOnChangeMenu,
    onFocusPanel,
    hideMegaMenu,
  } = useMegaMenu(categoryArray);

  return (
    <div
      className={cn({
        [styles['mega-menu']]: true,
        [styles['header__mega-menu']]: true,
      })}
      onBlur={hideMegaMenu}
      onMouseOut={hideMegaMenu}
    >
      <ul className={styles['mega-menu__trigger-list']}>
        {categoryArray.map((category) => (
          <li
            key={category.title}
          >
            <button
              className={styles['mega-menu__trigger']}
              tabIndex={0}
              type="button"
              onClick={createOnChangeMenu(category.title)}
              onFocus={createOnChangeMenu(category.title)}
              onBlur={hideMegaMenu}
              onMouseOver={createOnChangeMenu(category.title)}
              onMouseOut={hideMegaMenu}
              aria-expanded={isMegaMenuExpanded}
            >
              <span>
                {category.title}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div
        id={ID.PANEL}
        className={styles['mega-menu__panel']}
        onFocus={onFocusPanel}
        onMouseOver={onFocusPanel}
        aria-hidden={!isMegaMenuExpanded}
        aria-labelledby={Array.from({ length: 2 }, (_, index) => ID[`LABEL${index + 1}`]).join(' ')}
      >
        <ul className={styles['mega-menu__content']}>
          {panelMenuList?.map((menu) => (
            <li className={styles['mega-menu__menu']} key={menu.title}>
              <Link className={styles['mega-menu__link']} to={menu.link} onClick={hideMegaMenu}>
                {menu.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function PCPanel() {
  const navigate = useNavigate();

  const { setPrevPath } = usePrevPathStore((state) => state);
  const { logout } = useLogout();
  const { userType } = useUserTypeStore();

  const targetCategory = userType === 'OWNER' ? CATEGORY_OWNER : CATEGORY_COOP;

  const handleLogout = () => {
    logout(undefined, {
      onSettled: () => {
        setPrevPath('/login');
        navigate('/login');
      },
    });
  };

  return (
    <>
      <Link
        className={styles.header__logo}
        to="/"
        tabIndex={0}
      >
        <LogoIcon title="코인 로고" />
      </Link>
      <HeaderContent categoryArray={targetCategory} />

      <ul className={styles['header__auth-menu']}>
        {/* Auth 완료시 수정 필요 */}
        {/* <li className={styles['header__auth-link']}>
          <Link to="/owner/modify-info">
            정보수정
          </Link>
        </li> */}
        <li className={styles['header__auth-link']}>
          <button type="button" onClick={handleLogout}>
            로그아웃
          </button>
        </li>
      </ul>
    </>
  );
}
