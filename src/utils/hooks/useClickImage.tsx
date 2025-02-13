import { Portal } from 'component/common/Modal/PortalProvider';
import ImageModal from 'component/common/Modal/ImageModal';
import useModalPortal from 'utils/hooks/useModalPortal';

export const useClickImage = () => {
  const portalManager = useModalPortal();

  const onClickImage = (img: string[], index: number) => {
    portalManager.open((portalOption: Portal) => (
      <ImageModal imageList={img} imageIndex={index} onClose={portalOption.close} />
    ));
  };

  return { onClickImage };
};
