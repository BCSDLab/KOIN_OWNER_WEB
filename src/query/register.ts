import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getEmailAuthCode, getEmailDuplicate, getFileUrls, registerUser, verificationAuthCode,
} from 'api/register';
import axios from 'axios';
import parseRegisterData from 'page/Auth/Signup/utils/parseRegisterData';
import useRegisterInfo from 'store/registerStore';
import useShopRegistrationStore from 'store/shopRegistration';
import useUploadToken from 'store/uploadToken';
import showToast from 'utils/ts/showToast';

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
  const {
    status, refetch, isError, error, data,
  } = useQuery({
    queryKey: ['verificationCode', code],
    queryFn: () => verificationAuthCode({ certification_code: code, address: email }),
    enabled: false,
  });

  return {
    status, refetch, isError, error, data,
  };
};

export const useRegisterUser = (goNext:()=>void) => {
  const { userInfo, ownerInfo, resetRegisterInfo } = useRegisterInfo();
  const { shopId, name } = useShopRegistrationStore();
  const register = useMutation({
    mutationKey: ['registerUser'],
    mutationFn: async (fileUrls:string[]) => (
      registerUser(await parseRegisterData(
        userInfo,
        ownerInfo,
        fileUrls,
        shopId,
        name,
      ))
    ),
    onSuccess: () => {
      goNext();
      resetRegisterInfo();
    },
  });
  return { register };
};

export const useGetFileUrls = (goNext:()=>void) => {
  const { ownerInfo } = useRegisterInfo();
  const { register } = useRegisterUser(goNext);
  const formData = new FormData();
  const { uploadToken } = useUploadToken();
  ownerInfo.registerFiles?.forEach((file) => {
    formData.append('files', file);
  });
  const fileMutation = useMutation({
    mutationKey: ['getFileUrls'],
    mutationFn: async () => {
      try {
        const data = await getFileUrls(formData, uploadToken!);
        try {
          await register.mutateAsync(data.file_urls);
        } catch (e) {
          if (axios.isAxiosError(e)) {
            showToast('error', `${e.response?.data.message || e.message}`);
          }
        }
      } catch (e) {
        showToast('error', `파일업로드 중 에러가 발생했어요${e}`);
      }
    },
  });

  return fileMutation;
};
