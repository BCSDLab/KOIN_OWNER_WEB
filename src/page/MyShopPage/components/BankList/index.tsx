import { bank } from 'utils/constant/bank';
import cn from 'utils/ts/className';
import styles from './index.module.scss';

interface Props {
  bankName: string;
  account: string;
  setBank: (name: string) => void;
  setAccount: (account: string) => void;
  close: () => void;
}
export default function BankList({
  bankName, account, setBank, setAccount, close,
}: Props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <label htmlFor="account" className={styles.top}>
          <div className={styles.top__account}>계좌번호</div>
          <input
            id="account"
            className={styles.top__input}
            onChange={(e) => setAccount(e.target.value)}
            value={account}
          />
        </label>
        <hr className={styles.modal__divide} />
        <div className={styles.banks}>
          {bank.map((item) => (
            <div
              className={cn({
                [styles.banks__bank]: true,
                [styles['banks__bank--selected']]: item === bankName,
              })}
              onClick={() => setBank(item)}
              role="button"
              aria-hidden
            >
              {item}
            </div>
          ))}
        </div>
        <button type="button" className={styles.button} onClick={close}>확인</button>
      </div>
    </div>
  );
}
