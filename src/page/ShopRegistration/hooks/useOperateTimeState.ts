import { useEffect, useState } from 'react';
import useModalStore from 'store/modalStore';
import { WEEK } from 'utils/constant/week';

type OperateTimeProps = Record<string, string>;

export default function useOperateTimeState() {
  const {
    openTimeState,
    closeTimeState,
    shopClosedState,
  } = useModalStore();

  WEEK.forEach((day) => {
    if (openTimeState[day] === '24:00') {
      openTimeState[day] = '00:00';
    }
    if (closeTimeState[day] === '24:00') {
      closeTimeState[day] = '00:00';
    }
  });

  const [operateTimeState, setOperateTimeState] = useState<OperateTimeProps>({});

  const openDay = WEEK.filter((day) => shopClosedState[day] === false)[0];

  useEffect(() => {
    setOperateTimeState((prevOperateTimeState) => ({
      ...prevOperateTimeState,
      holiday: `매주 ${WEEK.filter((day) => shopClosedState[day]).join(' ')} 정기 휴무`,
      time: `${openTimeState[openDay]} ~ ${closeTimeState[openDay]}`,
    }));
  }, [openTimeState, closeTimeState, shopClosedState, openDay]);

  WEEK.forEach((day) => {
    const openTime = openTimeState[day] || '00:00';
    const closeTime = closeTimeState[day] || '00:00';
    operateTimeState[day] = shopClosedState[day] ? `매주 ${day} 정기 휴무` : `${openTime} ~ ${closeTime}`;
  });

  return operateTimeState;
}
