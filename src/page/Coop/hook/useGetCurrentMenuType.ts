import { Menus } from 'model/Coop';

const getCurrentMenuType = (): Menus => {
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

export default getCurrentMenuType;
