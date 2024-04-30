import useMediaQuery from 'utils/hooks/useMediaQuery';
import useAddMenuStore from 'store/addMenu';
import { useErrorMessageStore } from 'store/errorMessageStore';
import cn from 'utils/ts/className';
import { NewMenu } from 'model/shopInfo/newMenu';
import styles from './MenuName.module.scss';

interface MenuNameProps {
  isComplete: boolean;
  newMenuData: NewMenu;
  setNewMenuData: (newData: NewMenu) => void;
}

export default function MenuName({ isComplete, newMenuData, setNewMenuData }: MenuNameProps) {
  const { isMobile } = useMediaQuery();
  const { name } = useAddMenuStore();
  const { menuError } = useErrorMessageStore();

  const handleNameChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setNewMenuData({ ...newMenuData, name: e.target.value });
  };

  return (
    <div>
      {isMobile ? (
        <div className={styles.mobile__container}>
          <div className={styles.mobile__caption}>
            메뉴명
          </div>
          {isComplete ? (
            <span className={styles['mobile__name-text']}>{name}</span>
          ) : (
            <input
              className={cn({
                [styles['mobile__name-input']]: true,
                [styles['mobile__name-input--error']]: menuError,
              })}
              placeholder="예) 불족발 + 막국수 저녁 SET"
              onChange={handleNameChange}
              value={name}
            />
          )}
          {menuError && <span className={styles['error-message']}>{menuError}</span>}
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
              className={cn({
                [styles['name-input']]: true,
                [styles['name-input--error']]: menuError,
              })}
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
