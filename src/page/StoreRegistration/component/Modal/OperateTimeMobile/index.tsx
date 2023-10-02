import PreviousStep from 'component/common/Auth/PreviousStep';
import SubTitle from 'component/common/Auth/SubTitle';
import useStepStore from 'store/useStepStore';
import TimePicker from 'page/StoreRegistration/component/TimePicker';
import WEEK from 'utils/constants/week';
import styles from './OperateTimeMobile.module.scss';

interface OperateTimeProps {
  clickEvent: React.Dispatch<React.SetStateAction<boolean>>
}

export default function OperateTimeMobile({ clickEvent }: OperateTimeProps) {
  const step = useStepStore((state) => state.step);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles['chevron-left']}>
          <button type="button" className={styles.container__button} onClick={() => clickEvent(false)}>
            <PreviousStep step={step} />
          </button>
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
              {WEEK.map((day) => (
                <tr className={styles.table__data} key={day}>
                  <td>{day}</td>
                  <td className={styles['table__time-picker']}>
                    <TimePicker />
                    {' '}
                    ~
                    {' '}
                    <TimePicker />
                  </td>
                  <td><input type="checkbox" className={styles.table__checkbox} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.table__button}>
            <button type="button" onClick={() => clickEvent(false)}>
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
