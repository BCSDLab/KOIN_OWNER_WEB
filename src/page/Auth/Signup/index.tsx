import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import AgreeStep from './components/agreeStep';
import OwnerInfoStep from './components/ownerInfoStep';
import PhoneStep from './components/phoneStep';

interface Step {
  index: number;
  setIsStepComplete: (state: boolean) => void;
}

interface SelectOptions {
  personal: boolean;
  koin: boolean;
}

const initialSelectOption: SelectOptions = {
  personal: false,
  koin: false,
};

export default function SignUp() {
  const [selectItems, setSelectItems] = useState<SelectOptions>(initialSelectOption);
  const steps = useOutletContext<Step>();

  const handleSelect = (option: keyof SelectOptions | 'all') => {
    if (option === 'all') {
      const newState = !(selectItems.personal && selectItems.koin);
      setSelectItems({
        personal: newState,
        koin: newState,
      });
    } else {
      setSelectItems((prevState) => ({
        ...prevState,
        [option]: !prevState[option],
      }));
    }
  };

  useEffect(() => {
    setSelectItems(initialSelectOption);
  }, [steps.index]);

  useEffect(() => {
    if (selectItems.koin && selectItems.personal) {
      steps.setIsStepComplete(true);
    } else {
      steps.setIsStepComplete(false);
    }
  }, [selectItems, steps]);

  return (
    <>
      {steps.index === 0 && (
        <AgreeStep selectItems={selectItems} handleSelect={handleSelect} />
      )}
      {steps.index === 2 && (
        <PhoneStep setIsStepComplete={steps.setIsStepComplete} />
      )}
      {steps.index === 1 && (
        <OwnerInfoStep />
      )}
    </>
  );
}
