import { useMemo } from 'react';
import useModalStore from 'store/modalStore';

export default function CheckSameTime() {
  const { openTimeState, closeTimeState, shopClosedState } = useModalStore();
  const openTimeArray = Object.values(openTimeState);
  const closeTimeArray = Object.values(closeTimeState);
  const shopClosedArray = Object.values(shopClosedState);

  const isAllSameTime = openTimeArray.every((time) => openTimeArray[0] === time)
    && closeTimeArray.every((time) => closeTimeArray[0] === time);
  const hasClosedDay = shopClosedArray.some((closed) => closed);
  const isAllSameOpenTimeExceptClosedDays = useMemo(() => {
    const nonClosedOpenTime = openTimeArray.find((time, index) => {
      if (!shopClosedArray[index]) return time;
      return false;
    })!;
    return openTimeArray.every((time, index) => {
      if (shopClosedArray[index]) return true;
      return time === nonClosedOpenTime;
    });
  }, [openTimeArray, shopClosedArray]);
  const isAllSameCloseTimeExceptClosedDays = useMemo(() => {
    const nonClosedCloseTime = closeTimeArray.find((time, index) => {
      if (!shopClosedArray[index]) return time;
      return false;
    })!;
    return closeTimeArray.every((time, index) => {
      if (shopClosedArray[index]) return true;
      return time === nonClosedCloseTime;
    });
  }, [closeTimeArray, shopClosedArray]);
  const isAllClosed = shopClosedArray.every((closed) => closed);
  const isSpecificDayClosedAndAllSameTime = hasClosedDay
    && isAllSameOpenTimeExceptClosedDays
    && isAllSameCloseTimeExceptClosedDays && !isAllClosed;
  return {
    isAllSameTime,
    hasClosedDay,
    isAllSameOpenTimeExceptClosedDays,
    isAllSameCloseTimeExceptClosedDays,
    isSpecificDayClosedAndAllSameTime,
    isAllClosed,
  };
}
