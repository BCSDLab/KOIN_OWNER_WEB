import { useEffect, useState } from 'react';
import useModalStore from 'store/modalStore';
import { WEEK } from 'utils/constant/week';

export default function useOperateTimeState() {
  const { openTimeState, closeTimeState, shopClosedState } = useModalStore();
  const [groupedOperateTime, setGroupedOperateTime] = useState<string>('');

  function groupByLabel(daysInfo: { day: string; label: string }[]) {
    const groupMap: Record<string, string[]> = {};
    daysInfo.forEach(({ day, label }) => {
      if (!groupMap[label]) {
        groupMap[label] = [];
      }
      groupMap[label].push(day);
    });
    return Object.entries(groupMap)
      .map(([label, days]) => `${days.join(', ')} : ${label}`)
      .join('\n');
  }

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

    const weekdayInfos = dayInfos.slice(0, 5);
    const weekendInfos = dayInfos.slice(5);

    const weekdayLabels = weekdayInfos.map(({ label }) => label);
    const weekendLabels = weekendInfos.map(({ label }) => label);

    const isWeekdaySame = weekdayLabels.every((label) => label === weekdayLabels[0]);
    const isWeekendSame = weekendLabels.every((label) => label === weekendLabels[0]);

    const result: string[] = [];

    if (isWeekdaySame) {
      result.push(`평일 : ${weekdayLabels[0]}`);
    } else {
      result.push(groupByLabel(weekdayInfos));
    }

    if (isWeekendSame) {
      result.push(`주말 : ${weekendLabels[0]}`);
    } else {
      result.push(groupByLabel(weekendInfos));
    }

    setGroupedOperateTime(result.join('\n'));
  }, [openTimeState, closeTimeState, shopClosedState]);

  return groupedOperateTime;
}
