import { useQuery } from '@tanstack/react-query';
import { getEmailAuthCode, getEmailDuplicate, verificationAuthCode } from 'api/register';
import useUploadToken from 'store/uploadToken';

export const useCheckDuplicate = (email:string) => {
  const { status, refetch, error } = useQuery(['emailDuplicateCheck', email], () => getEmailDuplicate(email), { enabled: false });
  return { status, refetch, error };
};

export const useGenerateAuthCode = (email:string) => {
  const {
    status, refetch, isError, error,
  } = useQuery(
    ['generateEmailAuthCode', email],
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
  const { setUploadToken } = useUploadToken();
  const {
    status, refetch, isError, error,
  } = useQuery(
    ['verificationCode', code],
    () => verificationAuthCode({ certification_code: code, address: email }),
    {
      enabled: false,
      onSuccess: (response) => {
        if (response.token) {
          setUploadToken(response.token);
        }
      },
    },
  );
  return {
    status, refetch, isError, error,
  };
};
