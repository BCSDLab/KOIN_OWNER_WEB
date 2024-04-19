import { useSuspenseQuery } from '@tanstack/react-query';
import { getOwnerInfo } from 'api/auth';
import { getCoopInfo } from 'api/coop';
import { OwnerResponse } from 'model/auth';
import { CoopResponse } from 'model/Coop';
import { userKeys } from 'query/KeyFactory/userKeys';
import useUserTypeStore from 'store/userType';

type UserResponse = OwnerResponse | CoopResponse | null;

const userQuries = {
  OWNER: getOwnerInfo,
  COOP: getCoopInfo,
};

export default function useSuspenseUser() {
  const { userType } = useUserTypeStore();
  const queryFn = userType ? userQuries[userType] : () => Promise.resolve(null);

  const { data } = useSuspenseQuery<UserResponse>({
    queryKey: userKeys.userInfo,
    queryFn,
  });
  return { data };
}
