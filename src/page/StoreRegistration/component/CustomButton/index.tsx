import styles from './CustomButton.module.scss';

interface ButtonProps {
  content: string,
  buttonType: string,
  modalId?: string,
  disable?: boolean,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function CustomButton({
  content, buttonType, modalId, disable, onClick,
}:ButtonProps) {
  return (
    <button
      type="button"
      id={modalId}
      className={`${styles[`button--${buttonType}`]}`}
      onClick={onClick}
      disabled={!!disable}
    >
      {content}
    </button>
  );
}
