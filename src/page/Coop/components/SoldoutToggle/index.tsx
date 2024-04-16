import { Dinings } from 'model/Coop';
import useToggleStore from 'store/soldoutToggleStore';
import styles from './SoldoutToggle.module.scss';

interface SoldoutToggleProps {
  onClick: () => void;
  menu: Dinings;
}

export default function SoldoutToggle({ onClick, menu }: SoldoutToggleProps) {
  const { isSoldOut, toggleSoldOut } = useToggleStore();
  const isActive = isSoldOut[menu.id] ?? menu.soldout_at;

  const handleToggle = () => {
    onClick();
    toggleSoldOut(menu.id);
  };

  return (
    <svg className={styles['toggle-button']} onClick={handleToggle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 23">
      <rect
        className={styles.background}
        x="1.5"
        y="2"
        width="43"
        height="19"
        rx="9.5"
        fill={isActive ? '#175C8E' : '#E1E1E1'}
        stroke={isActive ? '#175C8E' : '#E1E1E1'}
        strokeWidth="3"
      />
      <circle
        className={styles.circle}
        cx={isActive ? 35 : 11}
        cy="11.5"
        r="8"
        fill={isActive ? 'white' : '#8E8E8E'}
      />
    </svg>
  );
}
