/* eslint-disable max-len */
import { useGetDining, useUploadDiningImage, useUpdateSoldOut } from 'query/coop';
import {
  Dinings, Menus, DINING_TYPES, Corner,
} from 'model/Coop';
import SoldoutToggle from 'page/Coop/components/SoldoutToggle';
import { ReactComponent as Photo } from 'assets/svg/coop/photo.svg';
import { useEffect, useRef, useState } from 'react';
import { getCoopUrl } from 'api/uploadFile/Uploadfile';
import CustomModal from 'component/common/CustomModal';
import styles from './MenuCard.module.scss';

interface MenuCardProps {
  selectedMenuType: Menus;
}

export default function MenuCard({ selectedMenuType }: MenuCardProps) {
  const { data } = useGetDining();
  const { uploadDiningImageMutation } = useUploadDiningImage();
  const { updateSoldOutMutation } = useUpdateSoldOut();
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const [isSoldoutModalOpen, setIsSoldoutModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Dinings | null>(null);
  const [selectedCorner, setSelectedCorner] = useState<Corner | null>(null);
  const [selectedImages, setSelectedImages] = useState<{ [key: number]: string }>({});

  const handleImageChange = (menuId: number) => async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const presignedUrl = await getCoopUrl({
        content_length: file.size,
        content_type: file.type,
        file_name: file.name,
      });
      await uploadDiningImageMutation({
        menu_id: menuId,
        image_url: presignedUrl.data.file_url,
      });
      setSelectedImages((prev) => ({
        ...prev,
        [menuId]: presignedUrl.data.file_url,
      }));
    }
  };

  const handleImageClick = (menuId: number) => () => {
    fileInputRefs.current[menuId]?.click();
  };

  const getDiningType = (menuType: Menus) => DINING_TYPES[menuType];

  const filteredData = data?.filter((menu:Dinings) => {
    const diningType = getDiningType(selectedMenuType);
    return menu.type === diningType && ['A코너', 'B코너', 'C코너'].includes(menu.place);
  });

  const getDiningDataForCorner = (corner: Corner, diningData: Dinings[]):
  Dinings | null => diningData.find(
    (menu) => menu.place === corner,
  ) || null;

  const handleToggleSoldoutModal = (menu?: Dinings, corner?: Corner) => {
    setSelectedMenu(menu || null);
    setSelectedCorner(corner || null);
    if (menu?.soldout_at === null) {
      setIsSoldoutModalOpen((prev) => !prev);
    }
  };

  const handleSoldoutModalClose = () => {
    setIsSoldoutModalOpen(false);
  };

  const handleSoldoutModalConfirm = () => {
    if (selectedMenu) {
      updateSoldOutMutation({
        menu_id: selectedMenu.id,
        sold_out: true,
      });
      setIsSoldoutModalOpen(false);
    }
  };

  const getImageUrl = (menu: Dinings) => {
    if (selectedImages[menu.id]) {
      return selectedImages[menu.id];
    } if (menu.image_url) {
      return menu.image_url;
    }
    return undefined;
  };

  useEffect(() => {
    if (data) {
      data.forEach((menu: Dinings) => {
        if (menu.image_url) {
          setSelectedImages((prev) => ({
            ...prev,
            [menu.id]: menu.image_url,
          }));
        }
      });
    }
  }, [data]);

  return (
    <>
      <div className={styles.container}>
        {(['A코너', 'B코너', 'C코너'] as Corner[]).map((corner) => {
          const menu = getDiningDataForCorner(corner, filteredData);
          return (
            <div key={corner} className={styles.card}>
              <div className={styles.card__header}>
                <span className={styles.card__title}>{corner}</span>
                <div className={styles['card__soldout-wrapper']}>
                  {menu && <span className={styles.card__soldout}>품절</span>}
                  {menu && <SoldoutToggle menuId={menu.id} onClick={() => handleToggleSoldoutModal(menu, corner)} menu={menu} />}
                </div>
              </div>
              <div className={styles.card__wrapper}>
                {menu ? (
                  <>
                    <div
                      className={styles.card__image}
                      onClick={handleImageClick(menu.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') handleImageClick(menu.id)();
                      }}
                    >
                      {getImageUrl(menu) ? (
                        <img src={getImageUrl(menu)} alt="" className={styles.card__image} />
                      ) : (
                        <Photo />
                      )}
                    </div>
                    <div className={styles.card__content}>
                      {menu.menu.map((item) => (
                        <div key={item}>{item}</div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div>
                    {corner}
                    에서 제공하는 식단 정보가 없습니다.
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={menu ? handleImageChange(menu.id) : undefined}
                ref={(el) => {
                  if (menu) {
                    fileInputRefs.current[menu.id] = el;
                  }
                }}
              />
            </div>
          );
        })}
      </div>
      <CustomModal
        title="품절 설정"
        modalSize="mobile"
        hasFooter={false}
        isOpen={isSoldoutModalOpen}
        isOverflowVisible
        onCancel={handleToggleSoldoutModal}
        buttonText="품절설정"
      >
        {selectedMenu && selectedCorner && (
          <div className={styles.modal}>
            <span className={styles.modal__header}>
              {selectedCorner}
              를
              {' '}
              <span className={styles['modal__header--primary']}>품절 상태</span>
              로 설정할까요?
            </span>
            <span className={styles.modal__description}>품절 상태는 복구할 수 없습니다.</span>
            <div className={styles.modal__wrapper}>
              <button type="button" onClick={handleSoldoutModalClose} className={styles.modal__button}>
                취소
              </button>
              <button type="button" onClick={handleSoldoutModalConfirm} className={styles['modal__button--primary']}>
                품절설정
              </button>
            </div>
          </div>
        )}

      </CustomModal>
    </>
  );
}
