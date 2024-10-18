import Warn from 'assets/svg/auth/warning.svg?react';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string | (string | undefined | null)[]
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (message.length > 0) {
    return (
      <div className={styles.warn}>
        <Warn />
        <span className={styles['warn--phrase']}>
          {typeof message === 'string' ? message : message[0]}
        </span>
      </div>
    );
  }

  return null;
}
