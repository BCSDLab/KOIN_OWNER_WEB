import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { getDining } from 'api/coop';
import { Dinings } from 'model/Coop';

export const useGetDining = () => {
  const queryClient = useQueryClient();
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
