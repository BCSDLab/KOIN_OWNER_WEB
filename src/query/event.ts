import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  addEvent, deleteEvent, getShopEventList, modifyEvent,
} from 'api/shop';
import { EventInfo } from 'model/shopInfo/event';
import { isKoinError } from '@bcsdlab/koin';
import showToast from 'utils/ts/showToast';
import ROUTES from 'static/routes';
import { shopKeys } from './KeyFactory/shopKeys';

export const useAddEvent = (id: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: EventInfo) => addEvent(id, data),
    onSuccess: () => {
      showToast('success', '이벤트 추가에 성공했습니다.');
      navigate(ROUTES.OWNER);
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
  const { data: eventList, refetch } = useQuery({
    queryKey: shopKeys.eventList(shopId),
    queryFn: () => getShopEventList({ id: shopId }),
  });

  return { eventList, refetch };
};

export const useModifyEvent = (shopId: number, eventId: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: EventInfo) => modifyEvent(shopId, eventId, data),
    onSuccess: () => {
      showToast('success', '이벤트 수정에 성공했습니다.');
      queryClient.invalidateQueries({ queryKey: shopKeys.eventList(shopId) });
      navigate(ROUTES.MAIN);
    },
    onError: (e) => {
      if (isKoinError(e)) {
        showToast('error', e.message);
      }
    },
  });

  return { mutate, isPending };
};
