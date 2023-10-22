import styles from './InputBox.module.scss';

interface InputProps {
  content: string;
  id: string;
}

export default function InputBox({ content, id }: InputProps) {
  return (
    <label htmlFor={id} className={styles.form}>
      <span className={styles.form__label}>{content}</span>
      <input type="text" id={id} className={styles.form__input} />
    </label>
  );
}
