import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getEmailAuthCode, getEmailDuplicate, getFileUrls, registerUser, verificationAuthCode,
} from 'api/register';
import parseRegisterData from 'page/Auth/Signup/utils/parseRegisterData';
import useModalStore from 'store/modalStore';
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

export const useRegisterUser = (goNext:()=>void) => {
  const { userInfo, ownerInfo, resetRegisterInfo } = useRegisterInfo();
  const { selectedShopId, searchShopState } = useModalStore();
  const register = useMutation({
    mutationKey: ['registerUser'],
    mutationFn: (fileUrls:string[]) => (
      registerUser(parseRegisterData(
        userInfo,
        ownerInfo,
        fileUrls,
        selectedShopId,
        searchShopState,
      ))
    ),
    onSuccess: () => {
      goNext();
      resetRegisterInfo();
    },
    onError: () => {
      alert('에러가 발생했습니다. 처음부터 다시 진행해주세요');
      resetRegisterInfo();
    },
  });
  return { register };
};

export const useGetFileUrls = (goNext:()=>void) => {
  const { ownerInfo, resetRegisterInfo } = useRegisterInfo();
  const { register } = useRegisterUser(goNext);
  const formData = new FormData();
  ownerInfo.registerFiles?.forEach((file) => {
    formData.append('files', file);
  });
  const fileMutation = useMutation({
    mutationKey: ['getFileUrls'],
    mutationFn: () => getFileUrls(formData),
    onSuccess: (data) => {
      register.mutate(data.file_urls);
    },
    onError: () => {
      alert('에러가 발생했습니다. 처음부터 다시 진행해주세요');
      resetRegisterInfo();
    },

  });

  return fileMutation;
};
