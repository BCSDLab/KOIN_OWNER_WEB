import useMediaQuery from 'utils/hooks/useMediaQuery';
import { useState } from 'react';
import styles from './MenuName.module.scss';

interface MenuNameProps {
  isComplete: boolean;
}

export default function MenuName({ isComplete }: MenuNameProps) {
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
            <span className={styles['mobile__name-text']}>{name}</span>
          ) : (
            <input
              className={styles.mobile__nameInput}
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
              className={styles.nameInput}
              placeholder="예) 불족발 + 막국수 저녁 SET"
              onChange={handleNameChange}
              value={name}
            />
          )}
        </div>
      )}
    </div>
  );
}
