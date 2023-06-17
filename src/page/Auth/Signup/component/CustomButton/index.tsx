import styles from './CustomButton.module.scss';

interface ButtonProps {
  content:string,
  buttonType:string,
  disable?: boolean,
  onClick?: () => void
}

export default function CustomButton({
  content, buttonType, disable, onClick,
}:ButtonProps) {
  return (
    <button
      type="button"
      className={`${styles[`button--${buttonType}`]}`}
      onClick={onClick}
      disabled={!!disable}
    >
      {content}
    </button>
  );
}
