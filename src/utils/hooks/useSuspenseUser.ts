import { useSuspenseQuery } from '@tanstack/react-query';
import { getOwnerInfo } from 'api/auth';
import { getCoopInfo } from 'api/coop';
import { OwnerResponse } from 'model/auth';
import { CoopResponse } from 'model/Coop';
import useUserTypeStore from 'store/userType';

type User = OwnerResponse | CoopResponse;

export default function useSuspenseUser() {
  const { userType } = useUserTypeStore();
  const queryFn = userType === 'OWNER' ? getOwnerInfo : getCoopInfo;

  const { data } = useSuspenseQuery<User>({
    queryKey: ['user', userType],
    queryFn,
  });
  return { data };
}
