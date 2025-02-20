import { TopBar } from 'page/Auth/components/Common';
import { OutletProps } from 'page/Auth/FindPassword/entity';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import AttachStep from './AttachStep';
import NameStep from './nameStep';
import OnwerNumberStep from './onwerNumberStep';
import ShopStep from './shopStep';
import styles from './index.module.scss';

interface Props {
  complete: () => void;
}

export default function OwnerStep({ complete }: Props) {
  const [steps, setSteps] = useState(0);
  const nextStep = () => setSteps((prev) => prev + 1);
  const {
    index, totalStep, currentStep, previousStep,
  } = useOutletContext<OutletProps>();

  if (steps === 0) {
    return (
      <>
        <TopBar
          previousStep={() => previousStep()}
          index={index}
          totalStep={totalStep}
          currentStep={currentStep}
        />
        <div className={styles.content}>
          <NameStep nextStep={() => nextStep()} />
        </div>
      </>
    );
  }

  if (steps === 1) {
    return (
      <ShopStep
        nextStep={() => nextStep()}
        previousStep={() => setSteps((prev) => prev - 1)}
      />
    );
  }

  if (steps === 2) {
    return (
      <>
        <TopBar
          previousStep={() => setSteps((prev) => prev - 1)}
          index={index}
          totalStep={totalStep}
          currentStep={currentStep}
        />
        <div className={styles.content}>
          <OnwerNumberStep nextStep={() => nextStep()} />
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar
        previousStep={() => setSteps((prev) => prev - 1)}
        index={index}
        totalStep={totalStep}
        currentStep={currentStep}
      />
      <div className={styles.content}>
        <AttachStep nextStep={complete} />
      </div>
    </>
  );
}
