import useMediaQuery from 'utils/hooks/useMediaQuery';
import StoreRegistrationMobile from './view/Mobile';
import StoreRegistrationPC from './view/PC';

export default function StoreRegistration() {
  const { isMobile } = useMediaQuery();

  return (
    <div>
      {isMobile ? <StoreRegistrationMobile /> : <StoreRegistrationPC />}
    </div>
  );
}
