import styles from './CustomButton.module.scss';

interface ButtonProps {
  content:string,
  type:string,
  disable?: boolean,
  onClick?: () => void
}

export default function CustomButton({
  content, type, disable, onClick,
}:ButtonProps) {
  return (
    <button
      type="button"
      className={`${styles[`button--${type}`]} ${disable ? styles['button--disable'] : null}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
