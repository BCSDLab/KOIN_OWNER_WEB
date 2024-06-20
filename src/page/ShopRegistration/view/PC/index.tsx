import Copyright from 'component/common/Copyright';
import Complete from 'component/Auth/Complete';
import { FormProvider, useForm } from 'react-hook-form';
import { OwnerShop } from 'model/shopInfo/ownerShop';
import { useFunnel } from 'utils/hooks/useFunnel';
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
  const methods = useForm<OwnerShop>({
    defaultValues: {
      category_ids: [],
      delivery_price: 0,
      description: '',
      image_urls: [],
      name: '',
      phone: '',
      address: '',
      delivery: false,
      pay_bank: false,
      pay_card: false,
      open: OPEN_DEFAULT_VALUES,
    },
  });

  const { Funnel, Step, setStep } = useFunnel('가게 등록');

  return (
    <FormProvider {...methods}>
      <Funnel>
        <Step name="가게 등록">
          <ShopEntry onNext={() => setStep('가게 정보 입력')} />
        </Step>
        <Step name="가게 정보 입력">
          <ShopConfirmation onNext={() => setStep('가게 등록 완료')} />
        </Step>
        <Step name="가게 등록 완료">
          <div className={styles.wrapper}>
            <Complete title="가게 정보 등록 완료" topText="가게 등록이 완료되었습니다." bottomText="업체 정보 수정은 내 상점에서 가능합니다." link="/login" linkText="메인화면으로 바로가기" />
            <Copyright />
          </div>
        </Step>
      </Funnel>
    </FormProvider>
  );
}
