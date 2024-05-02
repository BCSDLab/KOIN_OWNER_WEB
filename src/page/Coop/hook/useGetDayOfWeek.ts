import { Day } from 'model/Coop';
import dayjs from 'dayjs';

export const getDayOfWeek = (date: string): Day => {
  const dayOfWeek = dayjs(date).day();
  switch (dayOfWeek) {
    case 0:
      return '일';
    case 1:
      return '월';
    case 2:
      return '화';
    case 3:
      return '수';
    case 4:
      return '목';
    case 5:
      return '금';
    case 6:
      return '토';
    default:
      throw new Error('해당없음');
  }
};
