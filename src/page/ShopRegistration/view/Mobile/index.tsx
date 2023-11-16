/* eslint-disable jsx-a11y/label-has-associated-control */
import PreviousStep from 'component/common/Auth/PreviousStep';
import ProgressBar from 'component/common/Auth/ProgressBar';
import Complete from 'component/common/Auth/Complete';
import SubTitle from 'component/common/Auth/SubTitle';
import useStepStore from 'store/useStepStore';
import PROGRESS_TITLE from 'utils/constant/progress';
import ShopEntry from 'page/ShopRegistration/view/Mobile/ShopEntry';
import ShopCategory from 'page/ShopRegistration/view/Mobile/ShopCategory';
import Main from 'page/ShopRegistration/view/Mobile/Main';
import Sub from 'page/ShopRegistration/view/Mobile/Sub';
import ShopConfirmation from 'page/ShopRegistration/view/Mobile/ShopConfirmation';
import styles from './ShopRegistrationMobile.module.scss';

export default function ShopRegistrationMobile() {
  const { TOTAL_STEP, step, decreaseStep } = useStepStore();

  return (
    <div>
      <PreviousStep step={step} clickEvent={decreaseStep} />
      <div className={styles.content}>
        {step === 0 && <ShopEntry />}
        {step === 1 && (
        <>
          <SubTitle topTitle="가게 등록" bottomTitle="" topText="등록 하시려는 업체의" bottomText="메인 정보를 입력해 주세요." />
          <ProgressBar step={step - 1} total={TOTAL_STEP} progressTitle={PROGRESS_TITLE} />
          <ShopCategory />
        </>
        )}
        {step === 2 && (
        <>
          <SubTitle topTitle="가게 등록" bottomTitle="" topText="등록 하시려는 업체의" bottomText="메인 정보를 입력해 주세요." />
          <ProgressBar step={step - 1} total={TOTAL_STEP} progressTitle={PROGRESS_TITLE} />
          <Main />
        </>
        )}
        {step === 3 && (
        <>
          <SubTitle topTitle="가게 등록" bottomTitle="" topText="등록 하시려는 업체의" bottomText="세부 정보를 입력해 주세요." />
          <ProgressBar step={step - 1} total={TOTAL_STEP} progressTitle={PROGRESS_TITLE} />
          <Sub />
        </>
        )}
        {step === 4 && (
        <>
          <SubTitle topTitle="가게 등록" bottomTitle="" topText="입력하신 정보가 맞습니까?" bottomText="" />
          <div className={styles.margin} />
          <ProgressBar step={step - 1} total={TOTAL_STEP} progressTitle={PROGRESS_TITLE} />
          <ShopConfirmation />
        </>
        )}
        {step === 5 && (
        <Complete title="가게 등록 완료" topText="가게 등록이 완료되었습니다." bottomText="업체 정보 수정은 내 상점에서 가능합니다." link="/" linkText="메인 화면 바로가기" />
        )}
      </div>
    </div>
  );
}
