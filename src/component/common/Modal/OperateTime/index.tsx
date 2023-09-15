import { createPortal } from 'react-dom';
import CustomButton from 'page/StoreRegistration/component/CustomButton';
import styles from './OperateTime.module.scss';

interface OperateTimeProps {
  isOpen: boolean;
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function OperateTimeModal({ isOpen, onClose }: OperateTimeProps) {
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
            onClick={onClose}
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
              <tr className={styles.table__data}>
                <td>월</td>
                <td>
                  <input type="time" />
                  {' '}
                  ~
                  {' '}
                  <input type="time" />
                </td>
                <td><input type="checkbox" className={styles.table__checkbox} /></td>
              </tr>
              <tr className={styles.table__data}>
                <td>화</td>
                <td>
                  {' '}
                  <input type="time" />
                  {' '}
                  ~
                  {' '}
                  <input type="time" />
                </td>
                <td><input type="checkbox" className={styles.table__checkbox} /></td>
              </tr>
              <tr className={styles.table__data}>
                <td>수</td>
                <td>
                  {' '}
                  <input type="time" />
                  {' '}
                  ~
                  {' '}
                  <input type="time" />
                </td>
                <td><input type="checkbox" className={styles.table__checkbox} /></td>
              </tr>
              <tr className={styles.table__data}>
                <td>목</td>
                <td>
                  {' '}
                  <input type="time" />
                  {' '}
                  ~
                  {' '}
                  <input type="time" />
                </td>
                <td><input type="checkbox" className={styles.table__checkbox} /></td>
              </tr>
              <tr className={styles.table__data}>
                <td>금</td>
                <td>
                  {' '}
                  <input type="time" />
                  {' '}
                  ~
                  {' '}
                  <input type="time" />
                </td>
                <td><input type="checkbox" className={styles.table__checkbox} /></td>
              </tr>
              <tr className={styles.table__data}>
                <td>토</td>
                <td>
                  {' '}
                  <input type="time" />
                  {' '}
                  ~
                  {' '}
                  <input type="time" />
                </td>
                <td><input type="checkbox" className={styles.table__checkbox} /></td>
              </tr>
              <tr className={styles.table__data}>
                <td>일</td>
                <td>
                  {' '}
                  <input type="time" />
                  {' '}
                  ~
                  {' '}
                  <input type="time" />
                </td>
                <td><input type="checkbox" className={styles.table__checkbox} /></td>
              </tr>
            </tbody>
          </table>
          <CustomButton content="다음" buttonType="large" />
        </div>
      </div>
    </div>,
    document.body as HTMLElement,
  );
}
