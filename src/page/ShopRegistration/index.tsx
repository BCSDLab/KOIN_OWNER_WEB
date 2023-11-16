import useMediaQuery from 'utils/hooks/useMediaQuery';
import ShopRegistrationMobile from './view/Mobile';
import ShopRegistrationPC from './view/PC';

export default function ShopRegistration() {
  const { isMobile } = useMediaQuery();

  return (
    <div>
      {isMobile ? <ShopRegistrationMobile /> : <ShopRegistrationPC />}
    </div>
  );
}
