import { useGetFileUrls, useRegisterUser } from 'query/register';
import { useEffect } from 'react';
import useRegisterInfo from 'store/registerStore';
import { User } from 'page/Auth/Signup/types/User';
import { Owner } from 'page/Auth/Signup/types/Owner';

const parseRegisterData = (userInfo:User, ownerInfo:Owner, fileUrls:any) => {
  const companyNumber = ownerInfo.registrationNumberMobile ? ownerInfo.registrationNumberMobile : `${ownerInfo.registrationNumberFront}-${ownerInfo.registrationNumberMiddle}-${ownerInfo.registrationNumberEnd}`;
  const phoneNumber = ownerInfo.phoneMobile ? ownerInfo.phoneMobile : `${ownerInfo.phoneFront}-${ownerInfo.phoneMiddle}-${ownerInfo.phoneEnd}`;
  const attatchmentUrls = JSON.parse(fileUrls);
  return {
    attachment_urls: attatchmentUrls,
    company_number: companyNumber,
    company_id: '0',
    email: userInfo.email!,
    name: ownerInfo.ownerName!,
    password: userInfo.password!,
    phone_number: phoneNumber,
    shop_name: ownerInfo.shopName!,
  };
};

export default function useRegister() {
  const { status, data: fileUrls, refetch } = useGetFileUrls();
  const { register } = useRegisterUser();
  const { userInfo, ownerInfo } = useRegisterInfo();
  useEffect(() => {
    if (status === 'success') {
      const registerInfo = parseRegisterData(userInfo, ownerInfo, fileUrls);
      console.log(registerInfo);
    //   register.mutate(registerInfo);
    }
  }, [status, refetch, register, userInfo, ownerInfo, fileUrls]);
  return { status, refetch };
}
