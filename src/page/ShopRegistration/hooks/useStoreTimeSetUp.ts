import { OwnerShop } from 'model/shopInfo/ownerShop';
import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import useModalStore from 'store/modalStore';
import { DAY_OF_WEEK } from 'utils/constant/week';

interface StoreTimeSetUpProps {
  setValue : UseFormSetValue<OwnerShop>;
}

export default function useStoreTimeSetUp({ setValue }: StoreTimeSetUpProps) {
  const { openTimeState, closeTimeState, shopClosedState } = useModalStore();
  const openTimeArray = Object.values(openTimeState);
  const closeTimeArray = Object.values(closeTimeState);
  const shopClosedArray = Object.values(shopClosedState);

  useEffect(() => {
    const openValue = DAY_OF_WEEK.map((day, index) => ({
      close_time: closeTimeArray[index],
      closed: shopClosedArray[index],
      day_of_week: day,
      open_time: openTimeArray[index],
    }));
    setValue('open', openValue);
  }, [closeTimeArray, openTimeArray, setValue, shopClosedArray]);
}
