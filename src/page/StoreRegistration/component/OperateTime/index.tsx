import useMediaQuery from 'utils/hooks/useMediaQuery';
import PreviousStep from 'component/common/Auth/PreviousStep';
import SubTitle from 'component/common/Auth/SubTitle';
import useStepStore from 'store/useStepStore';
import styles from './OperateTime.module.scss';

interface OperateTimeProps {
  clickEvent: React.Dispatch<React.SetStateAction<boolean>>
}

const week: string[] = ['월', '화', '수', '목', '금', '토', '일'];

export default function OperateTime({ clickEvent }: OperateTimeProps) {
  const { isMobile } = useMediaQuery();
  const step = useStepStore((state) => state.step);

  return (
    <div>
      {isMobile ? (
        <div className={styles.mobile}>
          <div className={styles['chevron-left']}>
            <button type="button" className={styles.mobile__button} onClick={() => clickEvent(false)}>
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
                {week.map((day) => (
                  <tr className={styles.table__data}>
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
            <div className={styles.table__button}>
              <button type="button" onClick={() => clickEvent(false)}>
                다음
              </button>
            </div>
          </div>
        </div>
      ) : (<div>Desktop</div>)}
    </div>
  );
}
