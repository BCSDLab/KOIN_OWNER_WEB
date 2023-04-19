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
        <div className={styles.modalContainer__modalHeader}>
          메뉴추가입니다~
        </div>
        <div className={styles.modalContainer__new_menu}>
          메뉴 들어가는 부분임
        </div>
      </div>
    </>
  );
}
