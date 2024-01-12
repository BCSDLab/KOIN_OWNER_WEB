import { ReactComponent as Warn } from 'assets/svg/auth/warning.svg';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string | undefined
}

export default function ErrorMessage({ message }:ErrorMessageProps) {
  return (
    <div className={styles.warn}>
      <Warn />
      <span className={styles['warn--phrase']}>{message}</span>
    </div>
  );
}
