import BackArrowIcon from 'assets/svg/common/back-arrow.svg?react';
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

  if ((pathname === ROUTES.Owner.AddMenu()
    || pathname.includes('modify-menu')
    || pathname.startsWith(ROUTES.Owner.Event({ isLink: false }))
    || pathname.startsWith(ROUTES.Owner.EditMenu())
    || pathname.includes('event-add')
    || pathname.includes('event-modify')
  )
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
          {pathname === ROUTES.Owner.AddMenu() && '메뉴 추가'}
          {pathname.includes('modify-menu') && '메뉴 수정'}
          {pathname.startsWith(ROUTES.Owner.Event({ isLink: false })) && '이벤트/공지 작성하기'}
          {pathname.startsWith(ROUTES.Owner.EditMenu()) && '메뉴 편집'}
          {pathname.includes('event-add') && '이벤트 추가'}
          {pathname.includes('event-modify') && '이벤트 수정'}
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
