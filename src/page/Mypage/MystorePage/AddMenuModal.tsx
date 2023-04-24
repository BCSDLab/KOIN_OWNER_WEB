import { ReactComponent as PlusIcon } from 'assets/svg/main/plus.svg';
import { ReactComponent as ImgPlusIcon } from 'assets/svg/mystore/imgplus.svg';
import { ReactComponent as GearIcon } from 'assets/svg/mystore/gear.svg';
import { ReactComponent as CancleIcon } from 'assets/svg/mystore/x-in-circle-cancle.svg';
import { ReactComponent as CheckCircleIcon } from 'assets/svg/mystore/check-circle.svg';
import styles from './MystorePage.module.scss';

type Props = {
  closeModal?: () => void;
};

const MenuType = ['이벤트 메뉴', '대표 메뉴', '사이드 메뉴', '세트 메뉴'];

export default function AddMenuModal({ closeModal }: Props) {
  return (
    <>
      <div className={styles.modalBack} onClick={closeModal} aria-hidden="true" />
      <div className={styles.modalContainer}>
        <div className={styles.modalContainer__Header}>
          <div className={styles.modalContainer__Title}>
            메뉴 추가
          </div>
        </div>
        <div className={styles['modalContainer__add-menu']}>
          <div className={styles['modalContainer__add-imgs']}>
            <div className={styles['modalContainer__caption-title']}>
              <div className={styles['modalContainer__setting-title']}>
                메뉴사진
              </div>
              <div className={styles.modalContainer__caption}>
                (최대 이미지 3장)
              </div>
            </div>
            <div className={styles['modalContainer__img-wapper']}>
              <div className={styles['modalContainer__add-new-img']}>
                <ImgPlusIcon className={styles['modalContainer__add-new-img--icon']} />
                <div className={styles['modalContainer__add-new-img--caption']}>이미지 추가</div>
              </div>
            </div>
          </div>
          <div className={styles.modalContainer__fence} />
          <div className={styles['modalContainer__info-setting']}>
            <div className={styles['modalContainer__menu-name-setting']}>
              <div className={styles['modalContainer__setting-title']}>
                메뉴명
              </div>
              <input className={styles['modalContainer__menu-name-input']} placeholder="   예) 불족발 + 막국수 저녁 SET" />
            </div>
            <div className={styles['modalContainer__menu-price-setting']}>
              <div className={styles['modalContainer__caption-title']}>
                <div className={styles['modalContainer__setting-title']}>가격</div>
                <div className={styles['modalContainer__single-menu']}>
                  <div className={styles['modalContainer__single-menu--phrase']}>
                    단일메뉴
                  </div>
                  <CheckCircleIcon className={styles['modalContainer__single-menu--icon']} />
                </div>
              </div>
              <div className={styles['modalContainer__price-info-inputs']}>
                <input className={styles['modalContainer__size-input']} placeholder="   예) 소 (1~2 인분)" />
                <input className={styles['modalContainer__price-input']} placeholder="원   " />
                <CancleIcon className={styles['modalContainer__cancle-icon']} />
              </div>
              <div className={styles['modalContainer__add-price']}>
                <PlusIcon className={styles['modalContainer__add-price-icon']} />
                <div className={styles['modalContainer__add-price-word']}>가격 추가</div>
              </div>
            </div>
            <div className={styles['modalContainer__menu-category-setting']}>
              <div className={styles['modalContainer__caption-title']}>
                <div className={styles['modalContainer__setting-title']}>
                  메뉴 카테고리
                </div>
                <div className={styles.modalContainer__caption}>
                  (최대 선택 n개)
                </div>
                <GearIcon className={styles['modalContainer__gear-icon']} />
              </div>
              <div className={styles['modalContainer__menu-categoty-wapper']}>
                {MenuType.map((type) => (
                  <div className={styles['modalContainer__menu-categoty-wapper--unit']}>
                    {type}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles['modalContainer__menu-combo-setting']}>
              <div className={styles['modalContainer__setting-title']}>
                메뉴 구성
              </div>
              <textarea className={styles['modalContainer__menu-combo-input']} placeholder=" 예) 불족발(소,중,대) + 막국수 + 랜덤 서비스 음료(500ml)" />
            </div>
            <div className={styles['modalContainer__btn-wrapper']}>
              <button type="button" onClick={closeModal} className={styles['modalContainer__delete-btn']}>취소</button>
              <button type="button" onClick={closeModal} className={styles['modalContainer__submit-btn']}>확인</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}