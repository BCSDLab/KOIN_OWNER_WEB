import { useQuery } from '@tanstack/react-query';
import { getEmailAuthCode, getEmailDuplicate, verificationAuthCode } from 'api/register';
import useUploadToken from 'store/uploadToken';

export const useCheckDuplicate = (email:string) => {
  const { status, refetch, error } = useQuery({
    queryKey: ['emailDuplicateCheck', email],
    queryFn: () => getEmailDuplicate(email),
    enabled: false,
  });
  return { status, refetch, error };
};

export const useGenerateAuthCode = (email:string) => {
  const {
    status, refetch, isError, error,
  } = useQuery({
    queryKey: ['generateEmailAuthCode', email],
    queryFn: () => getEmailAuthCode({ address: email }),
    enabled: false,
  });

  return {
    status, refetch, isError, error,
  };
};

export const useVerificationAuthCode = (code:string, email:string) => {
  const { setUploadToken } = useUploadToken();
  const {
    status, refetch, isError, error, isSuccess, data,
  } = useQuery({
    queryKey: ['verificationCode', code],
    queryFn: () => verificationAuthCode({ certification_code: code, address: email }),
    enabled: false,
  });
  if (isSuccess && data.token) {
    setUploadToken(data.token);
  }

  return {
    status, refetch, isError, error,
  };
};
