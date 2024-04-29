import { Menus } from 'model/Coop';
import dayjs from 'dayjs';

export type IsOpen = '운영중' | '운영종료';

export const getCurrentMenuType = (): Menus => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const time = hour * 60 + minute;

  // 00:01~10:30
  if (time >= 1 && time <= 630) {
    return '아침';
  }
  // 10:31~15:00
  if (time <= 900) {
    return '점심';
  }
  // 15:01~24:00
  return '저녁';
};

// date = 'yyMMdd'
export const getOpenMenuType = (selectedMenuType: Menus, date: string): IsOpen => {
  const today = dayjs().format('YYMMDD');
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const time = hour * 60 + minute;

  if (date !== today) {
    return '운영종료';
  }

  // 08:00~10:00
  if (selectedMenuType === '아침' && (time >= 480 && time <= 600)) {
    return '운영중';
  }
  // 11:00~14:00
  if (selectedMenuType === '점심' && (time >= 660 && time <= 840)) {
    return '운영중';
  }
  // 17:00~19:00
  if (selectedMenuType === '저녁' && (time >= 1020 && time <= 1140)) {
    return '운영중';
  }
  return '운영종료';
};
