import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { addEvent } from 'api/shop';
import { EventInfo } from 'model/shopInfo/event';
import { isKoinError } from '@bcsdlab/koin';
import showToast from 'utils/ts/showToast';
import { shopKeys } from './KeyFactory/shopKeys';

export const useAddEvent = (id: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: EventInfo) => addEvent(id, data),
    onSuccess: () => {
      showToast('success', '이벤트 추가에 성공했습니다.');
      queryClient.invalidateQueries({ queryKey: shopKeys.eventList(Number(id)) });
      navigate('/owner');
    },
    onError: (e) => {
      if (isKoinError(e)) showToast('error', e.message);
    },
  });

  return { mutate, isPending };
};
