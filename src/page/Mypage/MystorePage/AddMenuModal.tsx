import { ReactComponent as PlusIcon } from 'assets/svg/main/plus.svg';
import { ReactComponent as ImgPlusIcon } from 'assets/svg/mystore/imgplus.svg';
import { ReactComponent as GearIcon } from 'assets/svg/mystore/gear.svg';
import { ReactComponent as CancleIcon } from 'assets/svg/mystore/x-in-circle-cancle.svg';
import { ReactComponent as CheckCircleIcon } from 'assets/svg/mystore/check-circle.svg';
// import MENU_CATEGORY from 'static/menuCategory';
import styles from './MystorePage.module.scss';

type Props = {
  closeModal?: () => void;
};

export default function AddMenuModal({ closeModal }: Props) {
  return (
    <>
      <div className={styles['modal-back']} onClick={closeModal} aria-hidden="true" />
      <div className={styles.modal}>
        <div className={styles.modal__Header}>
          <div className={styles.modal__Title}>
            메뉴 추가
          </div>
        </div>
        <div className={styles['modal__add-menu']}>
          <div className={styles['modal__add-imgs']}>
            <div className={styles['modal__caption-title']}>
              <div className={styles['modal__setting-title']}>
                메뉴사진
              </div>
              <div className={styles.modal__caption}>
                (최대 이미지 3장)
              </div>
            </div>
            <div className={styles['modal__img-wapper']}>
              <div className={styles['modal__add-new-img']}>
                <ImgPlusIcon className={styles['modal__add-new-img--icon']} />
                <div className={styles['modal__add-new-img--caption']}>이미지 추가</div>
              </div>
            </div>
          </div>
          <div className={styles.modalContainer__fence} />
          <div className={styles['modal__info-setting']}>
            <div className={styles['modal__menu-name-setting']}>
              <div className={styles['modal__setting-title']}>
                메뉴명
              </div>
              <input className={styles['modal__menu-name-input']} placeholder="예) 불족발 + 막국수 저녁 SET" />
            </div>
            <div className={styles['modal__menu-price-setting']}>
              <div className={styles['modal__caption-title']}>
                <div className={styles['modal__setting-title']}>가격</div>
                <div className={styles['modal__single-menu']}>
                  <div className={styles['modal__single-menu--phrase']}>
                    단일메뉴
                  </div>
                  <CheckCircleIcon className={styles['modal__single-menu--icon']} />
                </div>
              </div>
              <div className={styles['modal__price-info-inputs']}>
                <input className={styles['modal__size-input']} placeholder="예) 소 (1~2 인분)" />
                <input className={styles['modal__price-input']} placeholder="원" />
                <CancleIcon className={styles['modal__cancle-icon']} />
              </div>
              <div className={styles['modal__add-price']}>
                <PlusIcon className={styles['modal__add-price-icon']} />
                <div className={styles['modal__add-price-word']}>가격 추가</div>
              </div>
            </div>
            <div className={styles['modal__menu-category-setting']}>
              <div className={styles['modal__caption-title']}>
                <div className={styles['modal__setting-title']}>
                  메뉴 카테고리
                </div>
                <div className={styles.modal__caption}>
                  (최대 선택 n개)
                </div>
                <GearIcon className={styles['modal__gear-icon']} />
              </div>
              <div className={styles['modal__menu-categoty-wapper']}>
                {/* {MENU_CATEGORY.map((type) => (
                  <div key={type.title} className={styles['modal__menu-categoty-wapper--unit']}>
                    {type.title}
                  </div>
                ))} */}
              </div>
            </div>
            <div className={styles['modal__menu-combo-setting']}>
              <div className={styles['modal__setting-title']}>
                메뉴 구성
              </div>
              <textarea className={styles['modal__menu-combo-input']} placeholder=" 예) 불족발(소,중,대) + 막국수 + 랜덤 서비스 음료(500ml)" />
            </div>
            <div className={styles['modal__btn-wrapper']}>
              <button type="button" onClick={closeModal} className={styles['modal__delete-btn']}>취소</button>
              <button type="button" onClick={closeModal} className={styles['modal__submit-btn']}>확인</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
