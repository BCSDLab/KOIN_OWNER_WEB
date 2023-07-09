import { useQuery } from '@tanstack/react-query';
import getEmailDuplicate from 'api/register';

const useCheckDuplicate = (email:string) => {
  const { status, refetch } = useQuery(['emailDuplicateCheck', email], () => getEmailDuplicate(email), { enabled: false });
  return { status, refetch };
};

export default useCheckDuplicate;
