import useMediaQuery from 'utils/hooks/useMediaQuery';
import useAddMenuStore from 'store/addMenu';
import { useErrorMessageStore } from 'store/errorMessageStore';
import cn from 'utils/ts/className';
import styles from './MenuName.module.scss';

interface MenuNameProps {
  isComplete: boolean;
}

export default function MenuName({ isComplete }: MenuNameProps) {
  const { isMobile } = useMediaQuery();
  const { name, setName } = useAddMenuStore();
  const { menuError } = useErrorMessageStore();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };

  return (
    <div>
      {isMobile ? (
        <div className={styles.mobile__container}>
          <div className={styles.mobile__caption}>메뉴명</div>
          {isComplete ? (
            <span className={styles['mobile__name-text']}>{name}</span>
          ) : (
            <input
              className={cn({
                [styles['mobile__name-input']]: true,
                [styles['mobile__name-input--error']]: menuError,
              })}
              placeholder="예) 불족발 + 막국수 저녁 SET"
              onChange={(e) => handleNameChange(e)}
              value={name}
            />
          )}
          {menuError && (
            <span className={styles['error-message']}>{menuError}</span>
          )}
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.caption}>메뉴명</div>
          {isComplete ? (
            <span className={styles['name-text']}>{name}</span>
          ) : (
            <input
              className={cn({
                [styles['name-input']]: true,
                [styles['name-input--error']]: menuError,
              })}
              placeholder="예) 불족발 + 막국수 저녁 SET"
              onChange={(e) => handleNameChange(e)}
              value={name}
            />
          )}
          {menuError && (
            <span className={styles['error-message']}>{menuError}</span>
          )}
        </div>
      )}
    </div>
  );
}
