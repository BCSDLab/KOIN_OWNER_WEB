import { Link } from 'react-router-dom';
import { ReactComponent as Check } from 'assets/svg/auth/check.svg';
import styles from './Complete.module.scss';

interface CompleteProps {
  title: string;
  textTop: string;
  textBottom: string;
  link: string;
  buttonText: string;
}
export default function Complete({
  title, textTop, textBottom, link, buttonText,
}: CompleteProps) {
  return (
    <div className={styles.content}>
      <div className={styles.content__complete}>
        <Check className={styles['content__complete--check-image']} />
      </div>
      <span className={styles.content__title}>{title}</span>
      <div className={styles.content__text}>
        <span>
          {textTop}
        </span>
        <span>
          {textBottom}
        </span>
      </div>
      <Link to={link} className={styles.content__button}>{buttonText}</Link>
    </div>
  );
}
