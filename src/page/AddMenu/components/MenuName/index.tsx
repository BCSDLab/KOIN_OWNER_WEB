import useMediaQuery from 'utils/hooks/useMediaQuery';
import useAddMenuStore from 'store/addMenu';
import { useErrorMessageStore } from 'store/errorMessageStore';
import styles from './MenuName.module.scss';

interface MenuNameProps {
  isComplete: boolean;
}

export default function MenuName({ isComplete }: MenuNameProps) {
  const { isMobile } = useMediaQuery();
  const { name, setName } = useAddMenuStore();
  const { menuError } = useErrorMessageStore();

  const handleNameChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
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
              className={styles['mobile__name-input']}
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
