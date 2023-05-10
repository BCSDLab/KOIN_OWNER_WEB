import PreviousStep from 'component/common/PreviousStep';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import styles from './StoreReg.module.scss';
import useClickArrow from './hooks/useClickArrow';

export default function StoreReg() {
  const { isMobile } = useMediaQuery();
  const { step, setStep, clickBackArrow } = useClickArrow();
  return (
    <div>
      {isMobile ? (
        <div>
          <div className={styles['chevron-left']}>
            <PreviousStep step={step} clickBackArrow={clickBackArrow} />
          </div>
        </div>
      ) : (<div>Desktop</div>)}
    </div>
  );
}
