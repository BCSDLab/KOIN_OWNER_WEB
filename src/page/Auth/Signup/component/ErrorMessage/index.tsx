import { ReactComponent as Warn } from 'assets/svg/auth/warning.svg';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  messages?: (string | undefined)[]
  message?:string
}

export default function ErrorMessage({ messages, message }:ErrorMessageProps) {
  return (
    <div className={styles.warn}>
      <Warn />
      {message ? <span className={styles['warn--phrase']}>{message}</span>
        : messages && <span className={styles['warn--phrase']}>{messages[0]}</span>}
    </div>
  );
}
