import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { OutletProps } from 'page/Auth/FindPassword/entity';
import AgreeStep from './components/agreeStep';
import OwnerInfoStep from './components/ownerInfoStep';
import PhoneStep from './components/phoneStep';
import SearchShop from './components/searchShop';

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
  const steps:OutletProps = useOutletContext();
  const [stepPhoneComplete, setStepPhoneComplete] = useState(false);

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

  useEffect(() => {
  }, [steps.setIsStepComplete]);

  useEffect(() => {
    if (stepPhoneComplete) {
      steps.setIsStepComplete(true);
    }
  }, [stepPhoneComplete, steps]);

  return (
    <>
      {steps.index === 0 && (
        <AgreeStep selectItems={selectItems} handleSelect={handleSelect} />
      )}
      {steps.index === 1 && (
        <PhoneStep setIsStepComplete={setStepPhoneComplete} />
      )}
      {steps.index === 2 && (steps.isSearch
        ? (
          <SearchShop />
        ) : (
          <OwnerInfoStep
            onSearch={() => steps.setIsSearch(true)}
            setIsStepComplete={setStepPhoneComplete}
          />
        )
      )}
    </>
  );
}
