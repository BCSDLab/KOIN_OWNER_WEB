import { useQuery } from '@tanstack/react-query';
import { getEmailAuthCode, getEmailDuplicate, verificationAuthCode } from 'api/register';

export const useCheckDuplicate = (email:string) => {
  const { status, refetch } = useQuery(['emailDuplicateCheck', email], () => getEmailDuplicate(email), { enabled: false });
  return { status, refetch };
};

export const useGenerateAuthCode = (email:string) => {
  const {
    status, refetch, isError, error,
  } = useQuery(
    ['genrateEmailAuthCode', email],
    () => getEmailAuthCode({ address: email }),
    {
      enabled: false,
    },
  );
  return {
    status, refetch, isError, error,
  };
};

export const useVerificationAuthCode = (code:string, email:string) => {
  const { data, refetch } = useQuery(
    ['verificationCode', code],
    () => verificationAuthCode({ certificatoin_code: code, address: email }),
    {
      enabled: false,
    },
  );
  return { data, refetch };
};
