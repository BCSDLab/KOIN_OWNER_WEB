import { ReactComponent as XClose } from 'assets/svg/shopRegistration/close-x.svg';
import CustomButton from 'page/Auth/Signup/CustomButton';
import { createPortal } from 'react-dom';
import cn from 'utils/ts/className';
import { useEffect } from 'react';
import useLogger from 'utils/hooks/useLogger';
import styles from './CustomModal.module.scss';

interface CustomModalProps {
  buttonText?: string;
  title: string;
  eventTitle?:string;
  modalSize: string;
  hasFooter: boolean;
  isOpen: boolean;
  isOverflowVisible: boolean;
  onCancel: () => void;
  children: React.ReactNode
}

export default function CustomModal({
  buttonText = '', title, eventTitle = '', modalSize, hasFooter, isOpen, isOverflowVisible, onCancel, children,
}: CustomModalProps) {
  const logger = useLogger();
  useEffect(() => {
    if (isOpen) {
      document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      };
    }
    return undefined;
  }, [isOpen]);

  if (!isOpen) return null;
  return createPortal(
    <div className={styles.modal}>
      <div
        className={cn({
          [styles[`container__${modalSize}`]]: true,
          [styles[`container__${modalSize}--visible`]]: isOverflowVisible,
        })}
      >
        <div className={styles[`container__header--${modalSize}`]}>
          <span className={styles.container__title}>{title}</span>
          <XClose
            onClick={() => {
              onCancel();
              if (title === '가게 정보 수정') {
                logger.actionEventClick({ actionTitle: 'OWNER', title: `${eventTitle}_close`, value: `${title} 닫기` });
              }
            }}
            className={styles['container__close-button']}
          />
        </div>
        <div className={styles.content}>
          {children}
        </div>
        {hasFooter && (
          <div className={styles.container__footer}>
            <CustomButton
              content={buttonText}
              buttonSize="large"
              onClick={onCancel}
            />
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
