import Copyright from 'component/common/Copyright';
import Complete from 'component/Auth/Complete';
import { FormProvider, useForm } from 'react-hook-form';
import { OwnerShop } from 'model/shopInfo/ownerShop';
import useStepStore from 'store/useStepStore';
import { useDefaultValues } from 'page/ShopRegistration/view/Mobile';
import styles from './ShopRegistrationPC.module.scss';
import ShopEntry from './ShopEntry';
import ShopConfirmation from './ShopConfirmation';

const OPEN_DEFAULT_VALUES = [
  {
    day_of_week: 'MONDAY', closed: false, open_time: '00:00', close_time: '00:00',
  },
  {
    day_of_week: 'TUESDAY', closed: false, open_time: '00:00', close_time: '00:00',
  },
  {
    day_of_week: 'WEDNESDAY', closed: false, open_time: '00:00', close_time: '00:00',
  },
  {
    day_of_week: 'THURSDAY', closed: false, open_time: '00:00', close_time: '00:00',
  },
  {
    day_of_week: 'FRIDAY', closed: false, open_time: '00:00', close_time: '00:00',
  },
  {
    day_of_week: 'SATURDAY', closed: false, open_time: '00:00', close_time: '00:00',
  },
  {
    day_of_week: 'SUNDAY', closed: false, open_time: '00:00', close_time: '00:00',
  },
];

export default function ShopRegistrationPC() {
  const data = useDefaultValues();
  const methods = useForm<OwnerShop>({
    defaultValues: {
      category_ids: [],
      delivery_price: 0,
      description: '',
      image_urls: [],
      name: data.shop_name || '',
      phone: data.shop_number.replace(/^(\d{3})(\d{3,4})(\d{4})$/, '$1-$2-$3') || '',
      address: '',
      delivery: false,
      pay_bank: false,
      pay_card: false,
      open: OPEN_DEFAULT_VALUES,
    },
  });

  const { step, setStep } = useStepStore();

  return (
    <FormProvider {...methods}>
      {step === 0 && <ShopEntry onNext={() => setStep(1)} />}
      {step === 1 && <ShopConfirmation onNext={() => setStep(2)} />}
      {step === 2 && (
      <div className={styles.wrapper}>
        <Complete title="가게 정보 등록 완료" topText="가게 등록이 완료되었습니다." bottomText="업체 정보 수정은 내 상점에서 가능합니다." link="/login" linkText="메인화면으로 바로가기" />
        <Copyright />
      </div>
      )}
    </FormProvider>
  );
}
