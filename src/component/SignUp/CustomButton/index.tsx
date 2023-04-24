import styles from './CustomButton.module.scss';

interface ButtonProps {
  content:string,
  type:string,
  disable?: boolean,
  event?: () => void
}

export default function CustomButton({
  content, type, disable, event,
}:ButtonProps) {
  return (
    <button
      type="button"
      className={`${styles[`button--${type}`]} ${disable ? styles['button--disable'] : null}`}
      onClick={event}
    >
      {content}
    </button>
  );
}
