import PreviousStep from 'component/Auth/PreviousStep';
import ProgressBar from 'component/Auth/ProgressBar';
import Complete from 'component/Auth/Complete';
import SubTitle from 'component/Auth/SubTitle';
import PROGRESS_TITLE from 'utils/constant/progress';
import ShopEntry from 'page/ShopRegistration/view/Mobile/ShopEntry';
import ShopCategory from 'page/ShopRegistration/view/Mobile/ShopCategory';
import Main from 'page/ShopRegistration/view/Mobile/Main';
import Sub from 'page/ShopRegistration/view/Mobile/Sub';
import ShopConfirmation from 'page/ShopRegistration/view/Mobile/ShopConfirmation';
import { useFunnel } from 'utils/hooks/useFunnel';
import { FormProvider, useForm } from 'react-hook-form';
import styles from './ShopRegistrationMobile.module.scss';

export default function ShopRegistrationMobile() {
  const {
    Funnel, Step, setStep, currentStep,
  } = useFunnel('가게 등록');

  const currentIndex = PROGRESS_TITLE.findIndex((step) => step.title === currentStep);

  const decreaseStep = () => {
    if (currentIndex > 0) {
      setStep(PROGRESS_TITLE[currentIndex - 1].title);
    }
  };

  const methods = useForm({
    defaultValues: {
      category_ids: [],
      delivery_price: 0,
      description: '',
      image_urls: [],
      owner: '',
      name: '',
      phone: '',
      address: '',
      delivery: false,
      pay_bank: false,
      pay_card: false,
    },
  });

  return (
    <FormProvider {...methods}>
      {currentStep !== '가게 등록' && <PreviousStep step={currentIndex} clickEvent={decreaseStep} />}
      <div className={styles.content}>
        <Funnel>
          <Step name="가게 등록">
            <ShopEntry onNext={() => setStep('가게 카테고리 설정')} />
          </Step>
          <Step name="가게 카테고리 설정">
            <>
              <SubTitle
                topTitle="가게 등록"
                bottomTitle=""
                topText="등록 하시려는 업체의"
                bottomText="메인 정보를 입력해 주세요."
              />
              <ProgressBar
                step={PROGRESS_TITLE[1].step}
                total={PROGRESS_TITLE.length}
                progressTitle={PROGRESS_TITLE[1].title}
              />
              <ShopCategory onNext={() => setStep('메인 정보 입력')} />
            </>
          </Step>
          <Step name="메인 정보 입력">
            <>
              <SubTitle
                topTitle="가게 등록"
                bottomTitle=""
                topText="등록 하시려는 업체의"
                bottomText="메인 정보를 입력해 주세요."
              />
              <ProgressBar
                step={PROGRESS_TITLE[2].step}
                total={PROGRESS_TITLE.length}
                progressTitle={PROGRESS_TITLE[2].title}
              />
              <Main onNext={() => setStep('세부 정보 입력')} />
            </>
          </Step>
          <Step name="세부 정보 입력">
            <>
              <SubTitle
                topTitle="가게 등록"
                bottomTitle=""
                topText="등록 하시려는 업체의"
                bottomText="세부 정보를 입력해 주세요."
              />
              <ProgressBar
                step={PROGRESS_TITLE[3].step}
                total={PROGRESS_TITLE.length}
                progressTitle={PROGRESS_TITLE[3].title}
              />
              <Sub onNext={() => setStep('가게 정보 확인')} />
            </>
          </Step>
          <Step name="가게 정보 확인">
            <>
              <SubTitle topTitle="가게 등록" bottomTitle="" topText="입력하신 정보가 맞습니까?" bottomText="" />
              <div className={styles.margin} />
              <ProgressBar
                step={PROGRESS_TITLE[4].step}
                total={PROGRESS_TITLE.length}
                progressTitle={PROGRESS_TITLE[4].title}
              />
              <ShopConfirmation onNext={() => setStep('가게 등록 완료')} />
            </>
          </Step>
          <Step name="가게 등록 완료">
            <Complete
              title="가게 등록 완료"
              topText="가게 등록이 완료되었습니다."
              bottomText="업체 정보 수정은 내 상점에서 가능합니다."
              link="/"
              linkText="메인 화면 바로가기"
            />
          </Step>
        </Funnel>
      </div>
    </FormProvider>
  );
}
