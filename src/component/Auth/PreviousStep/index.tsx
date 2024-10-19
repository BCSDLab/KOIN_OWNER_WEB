import PreviousArrowIcon from 'assets/svg/common/mobile-back-arrow.svg?react';
import styles from './PreviousStep.module.scss';

interface PreviousStepProps {
  step: number;
  clickEvent?: () => void;
}

export default function PreviousStep({ step, clickEvent }: PreviousStepProps) {
  // 이후에 가게 등록 첫 페이지에서 로그아웃 시 생기는 오류 해결 시 사용 예정
  // const navigate = useNavigate();
  // const handlePrevious = () => {
  //   if (clickEvent) {
  //     if (step === 0) {
  //       clickEvent();
  //       navigate('/login');
  //     } else {
  //       clickEvent();
  //     }
  //   }
  // };
  return (
    <div className={styles.previous}>
      <button type="button" className={styles.previous__button} disabled={step === 0} onClick={clickEvent}>
        <PreviousArrowIcon title="이전 단계로 가기" />
      </button>
    </div>
  );
}
