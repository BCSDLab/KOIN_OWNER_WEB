import { useCallback, useEffect, useState } from 'react';
import useUploadToken from 'store/uploadToken';
import useStepStore from 'store/useStepStore';
import useMediaQuery from 'utils/hooks/useMediaQuery';

export default function useRegisterStep() {
  const {
    step, setStep, increaseStep, decreaseStep,
  } = useStepStore();
  const { isMobile } = useMediaQuery();
  const [registerStep, setRegisterStep] = useState(0);
  const { uploadToken } = useUploadToken();

  useEffect(() => {
    setStep(0);
    setRegisterStep(0);
  }, [isMobile, setStep]);

  const goNext = useCallback(() => {
    increaseStep();
    setRegisterStep((regiStep) => regiStep + 1);
  }, [increaseStep, setRegisterStep]);

  useEffect(() => {
    if (uploadToken) {
      goNext();
    }
  }, [uploadToken, goNext]);

  const goPrev = () => {
    if (registerStep === 2) {
      setRegisterStep(1);
      setStep(1);
    } else if (step === 2) {
      setStep(1);
      setRegisterStep(1);
    } else {
      setRegisterStep(registerStep - 1);
      decreaseStep();
    }
  };
  return {
    goNext, registerStep, goPrev, step,
  };
}
