import { ReactComponent as BackArrowIcon } from 'assets/svg/common/back-arrow.svg';
import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import ROUTES from 'static/routes';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import styles from './Header.module.scss';
import MobilePanel from './MobilePanel';
import PCPanel from './PCPanel';

function Header() {
  const { pathname } = useLocation();
  const { isMobile } = useMediaQuery();

  if ((pathname === ROUTES.OwnerAddMenu
    || pathname.startsWith(ROUTES.OwnerModifyMenu.path)
    || pathname.startsWith(ROUTES.OwnerEvent.path))
    && isMobile) {
    return (
      <header className={styles['add-menu-header']}>
        <button
          title="뒤로 가기 버튼"
          className={styles['add-menu-header__prev-button']}
          type="button"
          onClick={() => window.history.back()}
        >
          <BackArrowIcon title="뒤로 가기 버튼" />
        </button>
        <div className={styles['add-menu-header__caption']}>
          {pathname === ROUTES.OwnerAddMenu && '메뉴추가'}
          {pathname.startsWith(ROUTES.OwnerModifyMenu.path) && '메뉴수정'}
          {pathname.startsWith(ROUTES.OwnerEvent.path) && '이벤트/공지 작성하기'}
        </div>
      </header>
    );
  }

  return (
    <header
      className={styles.header}
    >
      <nav className={styles.header__content}>
        {isMobile ? (
          <Suspense fallback={<div />}>
            <MobilePanel />
          </Suspense>
        ) : (
          <PCPanel />
        )}
      </nav>
    </header>
  );
}

export default Header;
