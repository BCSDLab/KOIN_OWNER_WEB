import { DAY_OF_WEEK, WEEK } from 'utils/constant/week';

export interface OpenTimeType {
  day_of_week: string;
  closed: boolean;
  open_time: string | null;
  close_time: string | null;
}

export type OperatingTimeGroup = {
  dayNames: string;
  label: string;
  status: 'closed' | '24h' | 'time';
};

function getKoreanDay(day_of_week: string) {
  const idx = DAY_OF_WEEK.indexOf(day_of_week);
  return WEEK[idx % 7];
}

function groupBySchedule(daySet: OpenTimeType[]) {
  const CLOSED_KEY = '__CLOSED_KEY__';
  const map: Record<string, OpenTimeType[]> = {};

  daySet.forEach((day) => {
    if (day.closed) {
      if (!map[CLOSED_KEY]) {
        map[CLOSED_KEY] = [];
      }
      map[CLOSED_KEY].push(day);
    } else {
      const open = day.open_time ?? '00:00';
      const close = day.close_time ?? '00:00';
      const key = `${open}-${close}`;
      if (!map[key]) {
        map[key] = [];
      }
      map[key].push(day);
    }
  });

  return Object.entries(map).map(([key, dayList]) => {
    const dayNames = dayList.map((d) => getKoreanDay(d.day_of_week)).join(', ');
    if (key === CLOSED_KEY) {
      return { dayNames, label: '휴무', status: 'closed' } as const;
    }
    const [first] = dayList;
    if (first.open_time === '00:00' && first.close_time === '00:00') {
      return { dayNames, label: '24시간 운영', status: '24h' } as const;
    }
    return {
      dayNames,
      label: `${first.open_time} ~ ${first.close_time}`,
      status: 'time',
    } as const;
  });
}

export default function groupOperatingTime(openData: OpenTimeType[]): OperatingTimeGroup[] {
  if (!openData || openData.length === 0) return [];

  const weekdaySet = openData.filter((item) => {
    const idx = DAY_OF_WEEK.indexOf(item.day_of_week);
    return idx >= 0 && idx <= 4;
  });
  const weekendSet = openData.filter((item) => {
    const idx = DAY_OF_WEEK.indexOf(item.day_of_week);
    return idx >= 5 && idx <= 6;
  });

  const weekdayGroups = groupBySchedule(weekdaySet);
  const weekendGroups = groupBySchedule(weekendSet);

  if (weekdayGroups.length === 1) {
    const onlyGroup = weekdayGroups[0];
    const allDays = weekdaySet
      .map((d) => getKoreanDay(d.day_of_week))
      .join(', ');
    if (onlyGroup.dayNames === allDays) {
      weekdayGroups[0] = { ...onlyGroup, dayNames: '평일' };
    }
  }

  if (weekendGroups.length === 1) {
    const onlyGroup = weekendGroups[0];
    const allDays = weekendSet
      .map((d) => getKoreanDay(d.day_of_week))
      .join(', ');
    if (onlyGroup.dayNames === allDays) {
      weekendGroups[0] = { ...onlyGroup, dayNames: '주말' };
    }
  }

  const combined = [...weekdayGroups, ...weekendGroups];
  combined.sort((a, b) => {
    const orderByStatus = (status: OperatingTimeGroup['status']) => {
      if (status === '24h') return 1;
      if (status === 'time') return 2;
      return 3;
    };
    return orderByStatus(a.status) - orderByStatus(b.status);
  });

  return combined;
}
