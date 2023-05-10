import { useState } from 'react';

const useClickArrow = () => {
  const [step, setStep] = useState(0);
  const clickBackArrow = () => {
    if (step === 1) return;
    setStep(step - 1);
  };

  return { step, setStep, clickBackArrow };
};

export default useClickArrow;
