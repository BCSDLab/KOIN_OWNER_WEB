import { ReactComponent as BackArrowIcon } from 'assets/svg/common/back-arrow.svg';
import { useLocation } from 'react-router-dom';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { createPortal } from 'react-dom';
import { useLogout } from 'query/auth';
import usePrevPathStore from 'store/path';
import useSuspenseUser from 'utils/hooks/useSuspenseUser';
import styles from './Header.module.scss';
import MobilePanel from './MobilePanel';
import PCPanel from './PCPanel';

function Header() {
  const { pathname } = useLocation();
  const { isMobile } = useMediaQuery();

  if ((pathname === '/owner/add-menu'
    || pathname.startsWith('/owner/modify-menu/')
    || pathname.startsWith('/owner/event-add/'))
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
          {pathname === '/owner/add-menu' && '메뉴추가'}
          {pathname.startsWith('/owner/modify-menu/') && '메뉴수정'}
          {pathname.startsWith('/owner/event-add/') && '이벤트/공지 작성하기'}
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
          <MobilePanel />
        ) : (
          <PCPanel />
        )}
      </nav>
    </header>
  );
}

export default Header;
