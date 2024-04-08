import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { getDining, updateSoldOut, uploadDiningImage } from 'api/coop';
import { DiningImages, SoldOut } from 'model/Coop';

export const useGetDining = () => {
  const { data } = useSuspenseQuery(
    {
      queryKey: ['dining'],
      queryFn: getDining,
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
