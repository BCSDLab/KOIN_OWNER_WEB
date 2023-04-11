import styles from './CustomButton.module.scss';

interface Button {
  content:string,
  type:string,
  disable?: boolean
}

export default function CustomButton({
  content, type, disable,
}:Button) {
  return (
    <button
      type="button"
      className={`${type} ${styles.button} ${type === 'large' ? styles.button__large : styles.button__small} ${disable ? styles.button__disable : null}`}
    >
      {content}

    </button>
  );
}
