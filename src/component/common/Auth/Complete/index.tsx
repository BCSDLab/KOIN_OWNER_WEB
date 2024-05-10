import { Link } from 'react-router-dom';
import { ReactComponent as Check } from 'assets/svg/auth/check.svg';
import useStepStore from 'store/useStepStore';
import useShopRegistrationStore from 'store/shopRegistration';
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
  const {
    setCategory,
    setCategoryId,
    setImageUrls,
    setName,
    setAddress,
    setPhone,
    setDeliveryPrice,
    setDescription,
    setDelivery,
    setPayBank,
    setPayCard,
  } = useShopRegistrationStore();

  const initialize = () => {
    setStep(0);
    setCategory('');
    setCategoryId(0);
    setDelivery(false);
    setDeliveryPrice(0);
    setDescription('');
    setImageUrls([]);
    setName('');
    setPayBank(false);
    setPayCard(false);
    setPhone('');
    setAddress(''); // 전역 상태 초기화
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
