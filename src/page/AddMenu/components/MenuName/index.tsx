import useMediaQuery from 'utils/hooks/useMediaQuery';
import useAddMenuStore from 'store/addMenu';
import { useErrorMessageStore } from 'store/errorMessageStore';
import { useDeleteMenu } from 'query/menu';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './MenuName.module.scss';

interface MenuNameProps {
  isComplete: boolean;
}

export default function MenuName({ isComplete }: MenuNameProps) {
  const { isMobile } = useMediaQuery();
  const { name, setName } = useAddMenuStore();
  const { menuError } = useErrorMessageStore();
  const { menuId } = useParams();
  const { deleteMenuMutation } = useDeleteMenu();
  const handleNameChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const navigate = useNavigate();
  const goMyShop = () => {
    navigate('/');
  };
  const handleMobileDeleteMenu = () => {
    deleteMenuMutation(Number(menuId));
    goMyShop();
  };

  return (
    <div>
      {isMobile ? (
        <div className={styles.mobile__container}>
          <div className={styles['mobile-delete-menu-container']}>
            <button
              className={styles['delete-menu-button']}
              type="button"
              onClick={handleMobileDeleteMenu}
            >
              메뉴 삭제
            </button>
          </div>
          <div className={styles.mobile__caption}>
            메뉴명
          </div>
          {isComplete ? (
            <span className={styles['mobile__name-text']}>{name}</span>
          ) : (
            <input
              className={styles['mobile__name-input']}
              placeholder="예) 불족발 + 막국수 저녁 SET"
              onChange={handleNameChange}
              value={name}
            />
          )}
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.caption}>
            메뉴명
          </div>
          {isComplete ? (
            <span className={styles['name-text']}>{name}</span>
          ) : (
            <input
              className={styles['name-input']}
              placeholder="예) 불족발 + 막국수 저녁 SET"
              onChange={handleNameChange}
              value={name}
            />
          )}
          {menuError && <span className={styles['error-message']}>{menuError}</span>}
        </div>
      )}
    </div>
  );
}
