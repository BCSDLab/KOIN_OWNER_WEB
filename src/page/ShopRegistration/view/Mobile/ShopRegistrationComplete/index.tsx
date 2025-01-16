import { Link } from 'react-router-dom';
import Check from 'assets/svg/auth/check.svg?react';
import useStepStore from 'store/useStepStore';
import useShopRegistrationStore from 'store/shopRegistration';
import styles from './ShopRegistrationComplete.module.scss';

interface CompleteProps {
  title: string;
  topText: string;
  bottomText: string;
}

export default function ShopRegistrationComplete({
  title, topText, bottomText,
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
      <Link to="/owner" className={styles.content__more} onClick={initialize}>내 상점 바로가기</Link>
      <Link to="/owner/shop-registration" className={styles.content__link} onClick={initialize}>가게 추가 등록하기</Link>
    </div>
  );
}
