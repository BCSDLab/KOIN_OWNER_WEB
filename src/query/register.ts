import { isKoinError } from '@bcsdlab/koin';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getPhoneAuthCode, getEmailDuplicate, getFileUrls, registerUser, verificationAuthCode,
} from 'api/register';
import parseRegisterData from 'page/Auth/SignupTmp/utils/parseRegisterData';
import useRegisterInfo from 'store/registerStore';
import useShopRegistrationStore from 'store/shopRegistration';
import useUploadToken from 'store/uploadToken';
import showToast from 'utils/ts/showToast';
import { registerKeys } from './KeyFactory/registerKeys';

export const useCheckDuplicate = (email:string) => {
  const { status, refetch, error } = useQuery({
    queryKey: registerKeys.emailCheck(email),
    queryFn: () => getEmailDuplicate(email),
    enabled: false,
  });
  return { status, refetch, error };
};

// export const useGenerateAuthCode = (email:string) => {
//   const {
//     status, refetch, isError, error,
//   } = useQuery({
//     queryKey: registerKeys.authCode(email),
//     queryFn: () => getEmailAuthCode({ address: email }),
//     enabled: false,
//   });

//   return {
//     status, refetch, isError, error,
//   };
// };

// export const useVerificationAuthCode = (code:string, email:string) => {
//   const {
//     status, refetch, isError, error, data,
//   } = useQuery({
//     queryKey: registerKeys.verificationCode(code, email),
//     queryFn: () => verificationAuthCode({ certification_code: code, address: email }),
//     enabled: false,
//   });

//   return {
//     status, refetch, isError, error, data,
//   };
// };

export const usePhoneAuthCode = (phoneNumber:string) => {
  const {
    status, refetch, isError, error,
  } = useQuery({
    queryKey: registerKeys.phoneAuthCode(phoneNumber),
    queryFn: () => getPhoneAuthCode({ phone_number: phoneNumber }),
    enabled: false,
  });
  return {
    status, refetch, isError, error,
  };
};
export const usePhoneVerificationAuthCode = (code:string, phoneNumber:string) => {
  const {
    status, refetch, isError, error, data,
  } = useQuery({
    queryKey: registerKeys.phoneVerificationCode(code, phoneNumber),
    queryFn: () => verificationAuthCode({ certification_code: code, phone_number: phoneNumber }),
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
    mutationKey: registerKeys.registerUser,
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
    mutationKey: registerKeys.fileUrlList,
    mutationFn: async () => {
      try {
        const data = await getFileUrls(formData, uploadToken!);
        try {
          await register.mutateAsync(data.file_urls);
        } catch (e) {
          if (isKoinError(e)) {
            showToast('error', `${e.message}`);
          }
        }
      } catch (e) {
        showToast('error', `파일업로드 중 에러가 발생했어요${e}`);
      }
    },
  });

  return fileMutation;
};
