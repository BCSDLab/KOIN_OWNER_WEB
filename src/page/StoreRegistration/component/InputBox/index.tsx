import styles from './InputBox.module.scss';

interface InputProps {
  content: string
}

export default function InputBox({ content }: InputProps) {
  return (
    <form className={styles.form}>
      <span className={styles.form__label}>{content}</span>
      <div className={styles.form__section}>
        <input type="text" className={styles.form__input} />
      </div>
    </form>
  );
}
