import styles from './MystorePage.module.scss';

type Props = {
  closeModal?: () => void;
};

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
            <div className={styles.modalContainer__settingtitle}>
              메뉴사진
            </div>
            <div className={styles.modalContainer__caption}>
              (최대 이미지 3장)
            </div>
          </div>
          <div className={styles.modalContainer__blocks} />
          <div className={styles.modalContainer__inputs}>
            <div className={styles.modalContainer__titleinputs}>
              <div className={styles.modalContainer__settingtitle}>
                메뉴명
              </div>
              <input className={styles['modalContainer__menu-input']} placeholder="   예) 불족발 + 막국수 저녁 SET" />
            </div>
            <div className={styles.modalContainer__priceinputs}>
              <div className={styles.modalContainer__settingtitle}>가격</div>
              <div className={styles.modalContainer__info}>
                <input className={styles['modalContainer__size-input']} placeholder="   예) 소 (1~2 인분)" />
                <input className={styles['modalContainer__price-input']} placeholder="원   " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
