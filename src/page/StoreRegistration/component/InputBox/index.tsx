import styles from './InputBox.module.scss';

interface InputProps {
  content: string
}

export default function InputBox({ content }: InputProps) {
  return (
    <div className={styles.content}>
      <span className={styles.content__label}>{content}</span>
      <div className={styles.content__input}>
        <input className={styles['content__input-text']} />
      </div>
    </div>
  );
}
