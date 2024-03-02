import { ReactComponent as Warn } from 'assets/svg/auth/warning.svg';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message:string | (string | undefined)[]
}

export default function ErrorMessage({ message }:ErrorMessageProps) {
  return (
    <div className={styles.warn}>
      <Warn />
      <span className={styles['warn--phrase']}>
        {typeof message === 'string' ? message : message[0]}
      </span>
    </div>
  );
}
