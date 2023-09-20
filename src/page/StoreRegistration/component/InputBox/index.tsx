import styles from './InputBox.module.scss';

interface InputProps {
  content: string;
  inputId: string;
}

export default function InputBox({ content, inputId }: InputProps) {
  return (
    <label htmlFor={inputId} className={styles.form}>
      <span className={styles.form__label}>{content}</span>
      <input type="text" id={inputId} className={styles.form__input} />
    </label>
  );
}
