/* eslint-disable no-nested-ternary */
import { useGetDining, useUploadDiningImage, useUpdateSoldOut } from 'query/coop';
import {
  Dinings, Menus, DINING_TYPES, Corner,
} from 'model/Coop';
import SoldoutToggle from 'page/Coop/components/SoldoutToggle';
import { ReactComponent as Photo } from 'assets/svg/coop/photo.svg';
import { ReactComponent as SoldOut } from 'assets/svg/coop/soldout.svg';
import { useEffect, useRef, useState } from 'react';
import { getCoopUrl } from 'api/uploadFile/index';
import SoldoutModal from 'page/Coop/components/SoldoutModal';
import axios from 'axios';
import { getOpenMenuType, OperatingStatus, OPEN } from 'page/Coop/hook/useGetCurrentMenuType';
import styles from './MenuCard.module.scss';

interface MenuCardProps {
  selectedMenuType: Menus;
  selectedDate: string;
}

interface FileInfo {
  file: File;
  presignedUrl: string;
}

export default function MenuCard({ selectedMenuType, selectedDate }: MenuCardProps) {
  const { uploadDiningImageMutation } = useUploadDiningImage();
  const { updateSoldOutMutation } = useUpdateSoldOut();
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const [isSoldoutModalOpen, setIsSoldoutModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Dinings | null>(null);
  const [selectedCorner, setSelectedCorner] = useState<Corner | null>(null);
  const [formmatDate, setFormmatDate] = useState<string>('');
  const { data } = useGetDining(formmatDate);
  const [openMenu, setOpenMenu] = useState<OperatingStatus>(
    getOpenMenuType(selectedMenuType, formmatDate),
  );

  const uploadImage = async ({ presignedUrl, file }: FileInfo) => {
    await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': 'image/jpeg, image/png, image/svg+xml, image/webp',
      },
    });
  };

  const handleImageChange = (menuId: number) => async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const presigned = await getCoopUrl({
        content_length: file.size,
        content_type: file.type,
        file_name: file.name,
      });
      if (presigned.data.pre_signed_url) {
        await uploadImage({ presignedUrl: presigned.data.pre_signed_url, file });
        uploadDiningImageMutation({
          menu_id: menuId,
          image_url: presigned.data.file_url,
        });
      }
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
    } else if (menu) {
      setIsSoldoutModalOpen((prev) => !prev);
    }
  };

  const handleSoldoutModalClose = () => {
    setIsSoldoutModalOpen(false);
  };

  const handleSoldoutModalConfirm = () => {
    if (selectedMenu && selectedMenu.soldout_at === null) {
      updateSoldOutMutation({
        menu_id: selectedMenu.id,
        sold_out: true,
      });
      setIsSoldoutModalOpen(false);
    } else if (selectedMenu && selectedMenu.soldout_at) {
      updateSoldOutMutation({
        menu_id: selectedMenu.id,
        sold_out: false,
      });
      setIsSoldoutModalOpen(false);
    }
  };

  useEffect(
    () => {
      setFormmatDate(selectedDate.replace('-', '').replace('-', '').substring(2));
    },
    [selectedDate],
  );

  useEffect(
    () => {
      setOpenMenu(getOpenMenuType(selectedMenuType, formmatDate));
    },
    [selectedMenuType, formmatDate],
  );

  return (
    <>
      <div className={styles.container}>
        {(['A코너', 'B코너', 'C코너'] as Corner[]).map((corner) => {
          const menu = getDiningDataForCorner(corner, filteredData);
          return (
            <div key={corner} className={styles.card}>
              <div className={styles.card__header}>
                {menu && menu.changed_at !== null ? (
                  <div className={styles['card__common-wrapper']}>
                    <span className={styles.card__title}>{corner}</span>
                    <div className={styles.card__kcal}>
                      {menu.kcal}
                      kcal
                    </div>
                    <div className={styles.card__changed}>변경됨</div>
                  </div>
                ) : (

                  menu && (
                  <div className={styles['card__common-wrapper']}>
                    <span className={styles.card__title}>{corner}</span>
                    <div className={styles.card__kcal}>
                      {menu.kcal}
                      kcal
                    </div>
                  </div>
                  )

                ) }
                <div className={styles['card__common-wrapper']}>
                  {menu && <span className={styles.card__soldout}>품절</span>}
                  {menu && (
                  <SoldoutToggle
                    onClick={() => handleToggleSoldoutModal(menu, corner)}
                    menu={menu}
                  />
                  )}
                </div>
              </div>
              <div className={styles.card__wrapper}>
                {menu ? (
                  <>
                    <div className={styles.image__wrapper}>
                      <div
                        className={styles.card__image}
                        onClick={handleImageClick(menu.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') handleImageClick(menu.id)();
                        }}
                      >
                        {menu.image_url ? (
                          <img src={menu.image_url} alt="" className={styles.card__image} />
                        ) : (!menu.soldout_at && (
                          <div className={styles['card__image--add']}>
                            <Photo />
                            <span>사진 추가하기</span>
                          </div>
                        ))}

                        {menu.soldout_at && (
                        <div className={styles['card__image--soldout']}>
                          <SoldOut />
                          <span>품절된 메뉴입니다.</span>
                        </div>
                        )}
                      </div>
                    </div>
                    <div className={styles.card__content}>
                      {menu.menu.map((item) => (
                        <div key={item}>{item}</div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className={styles['card__content--none']}>
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
      <SoldoutModal
        modalSize="mobile"
        hasFooter={false}
        isOpen={isSoldoutModalOpen}
        isOverflowVisible
        onCancel={handleSoldoutModalClose}
        buttonText="품절설정"
      >
        {openMenu === OPEN ? (
          selectedMenu?.soldout_at === null ? (
            <div className={styles.modal}>
              <span className={styles.modal__header}>
                {selectedCorner}
                를
                {' '}
                <span className={styles['modal__header--primary']}>품절 상태</span>
                로 설정할까요?
              </span>
              <span className={styles.modal__description}>알림이 발송되니 신중하게 설정해주세요.</span>
              <div className={styles.modal__wrapper}>
                <button type="button" onClick={handleSoldoutModalClose} className={styles.modal__button}>
                  취소
                </button>
                <button type="button" onClick={handleSoldoutModalConfirm} className={styles['modal__button--primary']}>
                  품절설정
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.modal}>
              <span className={styles.modal__header}>
                {selectedCorner}
                를
                {' '}
                <span className={styles['modal__header--primary']}>품절 취소</span>
                로 설정할까요?
              </span>
              <span className={styles.modal__description}>이미 발송된 알림은 취소되지 않습니다.</span>
              <div className={styles.modal__wrapper}>
                <button type="button" onClick={handleSoldoutModalClose} className={styles.modal__button}>
                  취소
                </button>
                <button type="button" onClick={handleSoldoutModalConfirm} className={styles['modal__button--primary']}>
                  품절취소
                </button>
              </div>
            </div>
          )
        ) : (selectedMenu?.soldout_at === null ? (
          <div className={styles.modal}>
            <span className={styles.modal__header}>
              현재
              {' '}
              <span className={styles['modal__header--secondary']}>운영 중</span>
              인 식단이 아닙니다.
            </span>
            <span className={styles.modal__description}>
              {selectedCorner}
              를 품절 상태로 설정할까요?
            </span>
            <div className={styles.modal__wrapper}>
              <button type="button" onClick={handleSoldoutModalClose} className={styles.modal__button}>
                취소
              </button>
              <button type="button" onClick={handleSoldoutModalConfirm} className={styles['modal__button--secondary']}>
                품절설정
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.modal}>
            <span className={styles.modal__header}>
              현재
              {' '}
              <span className={styles['modal__header--secondary']}>운영 중</span>
              인 식단이 아닙니다.
            </span>
            <span className={styles.modal__description}>
              {selectedCorner}
              를 품절 취소로 설정할까요?
            </span>
            <div className={styles.modal__wrapper}>
              <button type="button" onClick={handleSoldoutModalClose} className={styles.modal__button}>
                취소
              </button>
              <button type="button" onClick={handleSoldoutModalConfirm} className={styles['modal__button--secondary']}>
                품절취소
              </button>
            </div>
          </div>
        ))}
      </SoldoutModal>
    </>
  );
}
