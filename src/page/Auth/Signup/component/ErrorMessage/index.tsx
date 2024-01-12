import { ReactComponent as Warn } from 'assets/svg/auth/warning.svg';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  messages: (string | undefined)[]
}

export default function ErrorMessage({ messages }:ErrorMessageProps) {
  return (
    <div className={styles.warn}>
      <Warn />
      <span className={styles['warn--phrase']}>{messages[0]}</span>
    </div>
  );
}
