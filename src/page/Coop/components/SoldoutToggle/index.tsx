import { useState } from 'react';
import styles from './SoldoutToggle.module.scss';

export default function SoldoutToggle() {
  const [isActive, setIsActive] = useState(true);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <svg className={styles['toggle-button']} onClick={handleToggle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 23">
      <rect className={styles.background} x="1.5" y="2" width="43" height="19" fill={isActive ? '#E1E1E1' : '#175C8E'} stroke="#F5F5F5" />
      <circle className={styles.circle} cx={isActive ? 11 : 35} cy="11.5" />
    </svg>
  );
}
