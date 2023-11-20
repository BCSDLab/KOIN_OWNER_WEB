import useMediaQuery from 'utils/hooks/useMediaQuery';
import { useState } from 'react';
import styles from './MenuName.module.scss';

interface MenuPriceProps {
  isComplete: boolean;
}

export default function MenuName({ isComplete }: MenuPriceProps) {
  const { isMobile } = useMediaQuery();
  const [name, setName] = useState('');
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
            <p className={styles['mobile__name-text']}>{name}</p>
          ) : (
            <input
              className={styles.mobile__nameInput}
              placeholder="예) 불족발 + 막국수 저녁 SET"
              onChange={handleNameChange}
            />
          )}
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.caption}>
            메뉴명
          </div>
          {isComplete ? (
            <p>{name}</p>
          ) : (
            <input
              className={styles.nameInput}
              placeholder="예) 불족발 + 막국수 저녁 SET"
            />
          )}
        </div>
      )}
    </div>
  );
}
