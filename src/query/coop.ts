import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import {
  getCoopInfo, getDining, updateSoldOut, uploadDiningImage,
} from 'api/coop';
import { DiningImages, SoldOut } from 'model/Coop';
import { coopKeys } from './KeyFactory/coopKeys';

export const useGetDining = (date: string) => {
  const { data } = useSuspenseQuery(
    {
      queryKey: [coopKeys.dining, date],
      queryFn: () => getDining(date),
    },
  );
  return {
    data,
  };
};

export const useUpdateSoldOut = () => {
  const queryClient = useQueryClient();
  const { mutate: updateSoldOutMutation } = useMutation({
    mutationFn: (data: SoldOut) => updateSoldOut(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  return {
    updateSoldOutMutation,
  };
};

export const useUploadDiningImage = () => {
  const queryClient = useQueryClient();
  const { mutate: uploadDiningImageMutation } = useMutation({
    mutationFn: (data: DiningImages) => uploadDiningImage(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  return {
    uploadDiningImageMutation,
  };
};

export const useSuspenseCoopUser = () => {
  const { data } = useSuspenseQuery({
    queryKey: coopKeys.coopInfo,
    queryFn: getCoopInfo,
  });
  return { data };
};
