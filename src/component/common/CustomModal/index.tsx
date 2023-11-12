import { ReactComponent as XClose } from 'assets/svg/StoreRegistration/close-x.svg';
import CustomButton from 'page/Auth/Signup/component/CustomButton';
import { createPortal } from 'react-dom';
import cn from 'utils/ts/className';
import styles from './CustomModal.module.scss';

interface CustomModalProps {
  buttonText?: string;
  title: string;
  height: string;
  hasFooter: boolean;
  isOpen: boolean;
  hasOverflow?: boolean;
  onCancel: () => void;
  children: React.ReactNode
}

export default function CustomModal({
  buttonText = '', title, height, hasFooter, isOpen, hasOverflow, onCancel, children,
}: CustomModalProps) {
  if (!isOpen) return null;
  return createPortal(
    <div className={styles.modal}>
      <div
        className={cn({
          [styles.container]: true,
          [styles['container--selected']]: !!hasOverflow,
        })}
        style={{ height }}
      >
        <div className={styles.container__header}>
          <span className={styles.container__title}>{title}</span>
          <XClose
            onClick={onCancel}
            className={styles['container__close-button']}
          />
        </div>
        <div className={styles.content}>
          {children}
        </div>
        {hasFooter && (
          <div className={styles.container__footer}>
            <CustomButton content={buttonText} buttonSize="large" onClick={onCancel} />
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
