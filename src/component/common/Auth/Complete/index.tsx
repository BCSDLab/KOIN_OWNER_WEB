import { Link } from 'react-router-dom';
import { ReactComponent as Check } from 'assets/svg/auth/check.svg';
import useStepStore from 'store/useStepStore';
import styles from './Complete.module.scss';

interface CompleteProps {
  title: string;
  topText: string;
  bottomText: string;
  link: string;
  linkText: string;
}
export default function Complete({
  title, topText, bottomText, link, linkText,
}: CompleteProps) {
  const { setStep } = useStepStore();

  const initialize = () => {
    setStep(0);
  };
  return (
    <div className={styles.content}>
      <div className={styles.content__complete}>
        <Check className={styles['content__complete--check-image']} />
      </div>
      <span className={styles.content__title}>{title}</span>
      <div className={styles.content__text}>
        <span>
          {topText}
        </span>
        <span>
          {bottomText}
        </span>
      </div>
      <Link to={link} className={styles.content__link} onClick={initialize}>{linkText}</Link>
    </div>
  );
}
