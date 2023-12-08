import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getEmailAuthCode, getEmailDuplicate, verificationAuthCode, getFileUrls, registerUser,
} from 'api/register';
import { RegisterParam } from 'model/register';
import useRegisterInfo from 'store/registerStore';
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

export const useGetFileUrls = () => {
  const { ownerInfo } = useRegisterInfo();
  const { uploadToken } = useUploadToken();
  const formData = new FormData();
  ownerInfo.registerFiles?.forEach((file) => formData.append('files', file));
  console.log(formData, ownerInfo);
  const { status, data, refetch } = useQuery({
    queryKey: ['getFileUrls'],
    queryFn: () => getFileUrls(formData, uploadToken!),
    enabled: false,
  });

  return { status, data, refetch };
};

export const useRegisterUser = () => {
  const register = useMutation({
    mutationKey: ['registerUser'],
    mutationFn: (userParam:RegisterParam) => registerUser(userParam),
  });
  return { register };
};
