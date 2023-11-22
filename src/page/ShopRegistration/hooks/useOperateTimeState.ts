import { useEffect, useState } from 'react';
import useModalStore from 'store/modalStore';
import { WEEK } from 'utils/constant/week';

type OperateTimeProps = { [key: string]: string };

export default function useOperateTimeState() {
  const {
    openTimeState,
    closeTimeState,
    shopClosedState,
  } = useModalStore();

  const [operateTimeState, setOperateTimeState] = useState<OperateTimeProps>({});

  const openDay = WEEK.filter((day) => shopClosedState[day] === false)[0];

  useEffect(() => {
    setOperateTimeState((prevOperateTimeState) => ({
      ...prevOperateTimeState,
      holiday: `매주 ${WEEK.filter((day) => shopClosedState[day]).join('요일 ')}요일 정기 휴무`,
      time: `${openTimeState[openDay]} ~ ${closeTimeState[openDay]}`,
    }));
  }, [openTimeState, closeTimeState, shopClosedState, openDay]);

  WEEK.forEach((day) => {
    operateTimeState[day] = shopClosedState[day] ? `매주 ${day} 정기 휴무` : `${openTimeState[day]} ~ ${closeTimeState[day]}`;
  });

  return operateTimeState;
}
