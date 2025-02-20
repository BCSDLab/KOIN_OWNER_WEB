import { useEffect, useState } from 'react';
import useModalStore from 'store/modalStore';
import { WEEK } from 'utils/constant/week';

export default function useOperateTimeState() {
  const { openTimeState, closeTimeState, shopClosedState } = useModalStore();
  const [groupedOperateTime, setGroupedOperateTime] = useState<string>('');

  useEffect(() => {
    const dayInfos = WEEK.map((day) => {
      if (shopClosedState[day]) {
        return { day, label: '휴무' };
      }
      const open = openTimeState[day] ?? '00:00';
      const close = closeTimeState[day] ?? '00:00';
      if (open === '00:00' && close === '00:00') {
        return { day, label: '24시간 운영' };
      }
      return { day, label: `${open} ~ ${close}` };
    });

    const groupMap: Record<string, string[]> = {};
    dayInfos.forEach(({ day, label }) => {
      if (!groupMap[label]) {
        groupMap[label] = [];
      }
      groupMap[label].push(day);
    });

    const result = Object.entries(groupMap)
      .map(([timeLabel, days]) => `${days.join(', ')} : ${timeLabel}`)
      .join('\n');

    setGroupedOperateTime(result);
  }, [openTimeState, closeTimeState, shopClosedState]);

  return groupedOperateTime;
}
