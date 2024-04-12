import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { addEvent, deleteEvent, getStoreEventList } from 'api/shop';
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
      navigate('/owner');
      queryClient.refetchQueries({ queryKey: shopKeys.eventList(Number(id)) });
    },
    onError: (e) => {
      if (isKoinError(e)) showToast('error', e.message);
    },
  });

  return { mutate, isPending };
};

export const useDeleteEvent = (shopId: number, eventIds: number[]) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const deletePromises = eventIds.map((eventId : number) => deleteEvent(shopId, eventId));
      await Promise.all(deletePromises);
    },
    onSuccess: () => {
      showToast('success', '이벤트 삭제에 성공했습니다.');
      queryClient.invalidateQueries({ queryKey: shopKeys.eventList(shopId) });
    },
    onError: (e) => {
      if (isKoinError(e)) showToast('error', e.message);
    },
  });

  return { mutate, isPending };
};

export const useGetEventList = (shopId: number) => {
  const { data: eventList } = useQuery({
    queryKey: shopKeys.eventList(shopId),
    queryFn: () => getStoreEventList({ id: shopId }),
  });

  return { eventList };
};
