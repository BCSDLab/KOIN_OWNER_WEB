import { useSuspenseQuery } from '@tanstack/react-query';
import { getOwnerInfo } from 'api/auth';
import { getCoopInfo } from 'api/coop';
import { OwnerResponse } from 'model/auth';
import { CoopResponse } from 'model/Coop';
import useUserTypeStore from 'store/userType';

type UserResponse = OwnerResponse | CoopResponse;

const userQuries = {
  OWNER: getOwnerInfo,
  COOP: getCoopInfo,
};

export default function useSuspenseUser() {
  const { userType } = useUserTypeStore();
  const queryFn = userType ? userQuries[userType] : undefined;

  const { data } = useSuspenseQuery<UserResponse>({
    queryKey: ['user', userType],
    queryFn,
  });
  return { data };
}
