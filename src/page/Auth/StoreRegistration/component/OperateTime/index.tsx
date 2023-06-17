import useMediaQuery from 'utils/hooks/useMediaQuery';
import PreviousStep from 'component/common/Auth/PreviousStep';
import SubTitle from 'component/common/Auth/SubTitle';
import useStepStore from 'store/useStepStore';
import { Link } from 'react-router-dom';
import styles from './OperateTime.module.scss';

export default function OperateTime() {
  const { isMobile } = useMediaQuery();
  const step = useStepStore((state) => state.step);

  return (
    <div>
      {isMobile ? (
        <>
          <div className={styles['chevron-left']}>
            <Link to="/store-registration">
              <PreviousStep step={step} />
            </Link>
          </div>
          <div className={styles.content}>
            <SubTitle topTitle="가게 등록" bottomTitle="" topText="시간 설정" bottomText="" />
            <div className={styles.content__info}>평일/주말 운영시간</div>
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
                  <td>11:00~21:00</td>
                  <td><input type="checkbox" className={styles['table__data-checkbox']} /></td>
                </tr>
                <tr className={styles.table__data}>
                  <td>화</td>
                  <td>11:00~21:00</td>
                  <td><input type="checkbox" className={styles['table__data-checkbox']} /></td>
                </tr>
                <tr className={styles.table__data}>
                  <td>수</td>
                  <td>11:00~21:00</td>
                  <td><input type="checkbox" className={styles['table__data-checkbox']} /></td>
                </tr>
                <tr className={styles.table__data}>
                  <td>목</td>
                  <td>11:00~21:00</td>
                  <td><input type="checkbox" className={styles['table__data-checkbox']} /></td>
                </tr>
                <tr className={styles.table__data}>
                  <td>금</td>
                  <td>11:00~21:00</td>
                  <td><input type="checkbox" className={styles['table__data-checkbox']} /></td>
                </tr>
                <tr className={styles.table__data}>
                  <td>토</td>
                  <td>11:00~21:00</td>
                  <td><input type="checkbox" className={styles['table__data-checkbox']} /></td>
                </tr>
                <tr className={styles.table__data}>
                  <td>일</td>
                  <td>11:00~21:00</td>
                  <td><input type="checkbox" className={styles['table__data-checkbox']} /></td>
                </tr>
              </tbody>
            </table>
            <div className={styles.table__link}>
              <Link to="/store-registration">
                다음
              </Link>
            </div>
          </div>
        </>
      ) : (<div>Desktop</div>)}
    </div>
  );
}
