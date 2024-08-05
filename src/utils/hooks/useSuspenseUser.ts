import { useSuspenseQuery } from '@tanstack/react-query';
import { getOwnerInfo } from 'api/auth';
import { OwnerResponse } from 'model/auth';
import { userKeys } from 'query/KeyFactory/userKeys';
import useUserTypeStore from 'store/useUserTypeStore';

type UserResponse = OwnerResponse | null;

const userQuries = {
  OWNER: getOwnerInfo,
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
