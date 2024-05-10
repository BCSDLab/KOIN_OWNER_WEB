import { useSuspenseQuery } from '@tanstack/react-query';
import { getOwnerInfo } from 'api/auth';
import { ownerKeys } from './KeyFactory/ownerKeys';

export const useSuspenseOwnerUser = () => {
  const { data } = useSuspenseQuery({
    queryKey: ownerKeys.ownerInfo,
    queryFn: getOwnerInfo,
  });
  return { data };
};
