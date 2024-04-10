import { useMutation } from '@tanstack/react-query';
import { addEvent } from 'api/shop';
import { EventInfo } from 'model/shopInfo/event';
import { isKoinError } from 'utils/ts/isKoinError';
import showToast from 'utils/ts/showToast';

export const useAddEvent = (id: string) => {
  const { mutate } = useMutation({
    mutationFn: (data: EventInfo) => addEvent(id, data),
    onSuccess: () => showToast('success', '이벤트 추가에 성공했습니다.'),
    onError: (e) => {
      if (isKoinError(e)) showToast('error', e.message);
    },
  });

  return { mutate };
};
