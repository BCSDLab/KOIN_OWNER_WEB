import { User } from 'page/Auth/Signup/types/User';
import { Owner } from 'page/Auth/Signup/types/Owner';

const parseRegisterData = (
  userInfo:User,
  ownerInfo:Owner,
  fileUrls:string[] | undefined,
  selectedShopId:number | null,
  searchShopState:string,
) => {
  const companyNumber = ownerInfo.registrationNumberMobile ? ownerInfo.registrationNumberMobile : `${ownerInfo.registrationNumberFront}-${ownerInfo.registrationNumberMiddle}-${ownerInfo.registrationNumberEnd}`;
  const phoneNumber = ownerInfo.phoneMobile ? ownerInfo.phoneMobile : `${ownerInfo.phoneFront}-${ownerInfo.phoneMiddle}-${ownerInfo.phoneEnd}`;
  const attachmentUrls = fileUrls!.map((file) => ({ file_url: `https://${file}` }));
  const shopId = ownerInfo.shopName === searchShopState ? selectedShopId : null;
  return {
    attachment_urls: attachmentUrls,
    company_number: companyNumber,
    shop_id: shopId,
    email: userInfo.email!,
    name: ownerInfo.ownerName!,
    password: userInfo.password!,
    phone_number: phoneNumber,
    shop_name: ownerInfo.shopName!,
  };
};

export default parseRegisterData;
