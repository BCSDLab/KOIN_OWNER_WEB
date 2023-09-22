import { ReactComponent as XClose } from 'assets/svg/storereg/close-x.svg';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import { createPortal } from 'react-dom';
import styles from './CommonModal.module.scss';

interface CommonModalProps {
  title: string;
  isOpen: boolean;
  modalHandler: () => void;
  children: JSX.Element;
  modalSize: string;
}

export default function CommonModal({
  title, isOpen, modalHandler, children, modalSize,
}: CommonModalProps) {
  if (!isOpen) return null;
  return createPortal(
    <div className={styles.modal}>
      <div className={`${styles[`container--${modalSize}`]}`}>
        <div className={styles.container__header}>
          <span className={styles.container__title}>{title}</span>
          <XClose
            onClick={modalHandler}
            className={styles['container__close-button']}
          />
        </div>
        <div className={styles.content}>
          {children}
        </div>
        <div className={styles['container__next-button']}>
          <CustomButton content="다음" buttonType="large" onClick={modalHandler} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
