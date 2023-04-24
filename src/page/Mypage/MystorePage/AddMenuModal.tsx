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
  // const { isOpenModal, clickModal, closeModal } = useOpenModal();
  return (
    <>
      <div className={styles.modalBack} onClick={closeModal} aria-hidden="true" />
      <div className={styles.modalContainer}>
        <div className={styles.modalContainer__Header}>
          <div className={styles.modalContainer__Title}>
            메뉴 추가
          </div>
        </div>
        <div className={styles['modalContainer__new-setting']}>
          <div className={styles['modalContainer__imgs-setting']}>
            <div className={styles.modalContainer__captiontitle}>
              <div className={styles.modalContainer__settingtitle}>
                메뉴사진
              </div>
              <div className={styles.modalContainer__caption}>
                (최대 이미지 3장)
              </div>
            </div>
            <div className={styles.modalContainer__imgWapper}>
              <div className={styles.modalContainer__addimg}>
                <ImgPlusIcon className={styles['modalContainer__addimg-icon']} />
                <div className={styles['modalContainer__addimg-caption']}>이미지 추가</div>
              </div>
            </div>
          </div>
          <div className={styles.modalContainer__blocks} />
          <div className={styles['modalContainer__info-setting']}>
            <div className={styles.modalContainer__titleinputs}>
              <div className={styles.modalContainer__settingtitle}>
                메뉴명
              </div>
              <input className={styles['modalContainer__menu-input']} placeholder="   예) 불족발 + 막국수 저녁 SET" />
            </div>
            <div className={styles.modalContainer__priceinputs}>
              <div className={styles.modalContainer__captiontitle}>
                <div className={styles.modalContainer__settingtitle}>가격</div>
                <div className={styles.modalContainer__singlemenu}>
                  <div className={styles['modalContainer__singlemenu-word']}>
                    단일메뉴
                  </div>
                  <CheckCircleIcon className={styles['modalContainer__singlemenu-icon']} />
                </div>
              </div>
              <div className={styles.modalContainer__info}>
                <input className={styles['modalContainer__size-input']} placeholder="   예) 소 (1~2 인분)" />
                <input className={styles['modalContainer__price-input']} placeholder="원   " />
                <CancleIcon className={styles['modalContainer__cancle-icon']} />
              </div>
              <div className={styles.modalContainer__addPrice}>
                <PlusIcon className={styles['modalContainer__addPrice-icon']} />
                <div className={styles['modalContainer__addPrice-word']}>가격 추가</div>
              </div>
            </div>
            <div className={styles.modalContainer__categorypcik}>
              <div className={styles.modalContainer__captiontitle}>
                <div className={styles.modalContainer__settingtitle}>
                  메뉴 카테고리
                </div>
                <div className={styles.modalContainer__caption}>
                  (최대 선택 n개)
                </div>
                <GearIcon className={styles['modalContainer__gear-icon']} />
              </div>
              <div className={styles.modalContainer__menuWapper}>
                {MenuType.map((type) => (
                  <div className={styles.modalContainer__menucategory}>
                    {type}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.modalContainer__comboinput}>
              <div className={styles.modalContainer__settingtitle}>
                메뉴 구성
              </div>
              <textarea className={styles['modalContainer__combo-input']} placeholder=" 예) 불족발(소,중,대) + 막국수 + 랜덤 서비스 음료(500ml)" />
            </div>
            <div className={styles.modalContainer__sumitBtn}>
              <button type="button" className={styles['modalContainer__sumitBtn-delete']}>취소</button>
              <button type="button" className={styles['modalContainer__sumitBtn-submit']}>확인</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
