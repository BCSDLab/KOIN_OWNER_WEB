import { User } from 'page/Auth/Signup/types/User';
import { Owner } from 'page/Auth/Signup/types/Owner';
import sha256 from 'utils/ts/SHA-256';

const parseRegisterData = async (
  userInfo:User,
  ownerInfo:Owner,
  fileUrls:string[] | undefined,
  selectedShopId:string,
  searchShopState:string,
) => {
  const companyNumber = ownerInfo.registrationNumberMobile ? ownerInfo.registrationNumberMobile : `${ownerInfo.registrationNumberFront}-${ownerInfo.registrationNumberMiddle}-${ownerInfo.registrationNumberEnd}`;
  const phoneNumber = ownerInfo.phoneMobile ? ownerInfo.phoneMobile : `${ownerInfo.phoneFront}-${ownerInfo.phoneMiddle}-${ownerInfo.phoneEnd}`;
  const attachmentUrls = fileUrls!.map((file) => ({ file_url: `https://${file}` }));
  const shopId = ownerInfo.shopName === searchShopState ? Number(selectedShopId) : null;
  const hashedPassword = await sha256(userInfo.password!);

  return {
    attachment_urls: attachmentUrls,
    company_number: companyNumber,
    shop_id: shopId,
    email: userInfo.email!,
    name: ownerInfo.ownerName!,
    password: hashedPassword,
    phone_number: phoneNumber,
    shop_name: ownerInfo.shopName!,
  };
};

export default parseRegisterData;
