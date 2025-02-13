import { useOutletContext } from 'react-router-dom';
import { OutletProps } from 'page/Auth/FindPassword/entity';
import { useState } from 'react';
import OwnerStep from './components/onwerStep';
import AgreeStep from './components/agreeStep';
import AuthenticationStep from './components/phoneStep';

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
  const steps = useOutletContext<OutletProps >();

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

  return (
    <>

      {steps.index === 0 && (
        <AgreeStep
          selectItems={selectItems}
          handleSelect={handleSelect}
          nextStep={steps.nextStep}
        />
      )}
      {steps.index === 1 && (
        <AuthenticationStep nextStep={steps.nextStep} />
      )}

      {steps.index === 2 && (
        <OwnerStep complete={() => steps.setIsComplete(true)} />
      )}
    </>
  );
}
