import { createPortal } from 'react-dom';
import CustomButton from 'page/StoreRegistration/component/CustomButton';
import styles from './OperateTime.module.scss';

interface OperateTimeProps {
  isOpen: boolean;
  modalHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const week: string[] = ['월', '화', '수', '목', '금', '토', '일'];

export default function OperateTimeModal({ isOpen, modalHandler }: OperateTimeProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.content__header}>
          <span className={styles.content__title}>
            운영시간
          </span>
          <button
            type="button"
            id="timeSettingModal"
            onClick={modalHandler}
            className={styles['content__close-button']}
          >
            X
          </button>
        </div>
        <div className={styles.container}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>요일</th>
                <th>시간</th>
                <th>휴무</th>
              </tr>
            </thead>
            <tbody>
              {week.map((day) => (
                <tr className={styles.table__data} key={day}>
                  <td>{day}</td>
                  <td>
                    <input type="time" />
                    {' '}
                    ~
                    {' '}
                    <input type="time" />
                  </td>
                  <td><input type="checkbox" className={styles.table__checkbox} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <CustomButton content="다음" buttonType="large" modalId="timeSettingModal" onClick={modalHandler} />
        </div>
      </div>
    </div>,
    document.body as HTMLElement,
  );
}
