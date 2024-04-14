import { Dinings } from 'model/Coop';
import useToggleStore from 'store/soldoutToggleStore';
import styles from './SoldoutToggle.module.scss';

interface SoldoutToggleProps {
  menuId: number;
  onClick: () => void;
  menu: Dinings;
}

export default function SoldoutToggle({ menuId, onClick, menu }: SoldoutToggleProps) {
  const { isSoldOut, toggleSoldOut } = useToggleStore();
  const isActive = isSoldOut[menuId] ?? menu.soldout_at;

  const handleToggle = () => {
    onClick();
    toggleSoldOut(menuId);
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
        stroke="#F5F5F5"
        strokeWidth="3"
      />
      <circle
        cx={isActive ? 35 : 11}
        cy="11.5"
        r="8"
        fill="white"
      />
    </svg>
  );
}
