import { OwnerShop } from 'model/shopInfo/ownerShop';
import { UseFormSetValue, UseFormRegister } from 'react-hook-form';
import { bank } from 'utils/constant/bank';
import cn from 'utils/ts/className';
import showToast from 'utils/ts/showToast';
import styles from './index.module.scss';

interface Props {
  close: () => void;
  register: UseFormRegister<OwnerShop>;
  setValue: UseFormSetValue<OwnerShop>;
  bankName: string | null;
  account_number: string | null;
}

const NUMBER_REGEX = /^[0-9-]+$/;
export default function BankList({
  close, register, setValue, bankName, account_number,
}: Props) {
  const validation = () => {
    if (account_number && !NUMBER_REGEX.test(account_number)) {
      showToast('error', '올바른 양식의 계좌번호를 입력해주세요');
      return;
    }
    if ((bankName && !account_number) || (!bankName && account_number)) {
      showToast('error', '모든 값을 입력해주세요');
      return;
    }
    close();
  };
  return (
    <div className={styles.overlay} onClick={validation} role="button" aria-hidden>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} role="button" aria-hidden>
        <label htmlFor="account" className={styles.top}>
          <div className={styles.top__account}>계좌번호</div>
          <input
            id="account"
            className={styles.top__input}
            {...register('account_number')}
            placeholder="계좌번호를 입력해주세요"
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
              onClick={() => {
                if (bankName === item) {
                  setValue('bank', null);
                  return;
                }
                setValue('bank', item);
              }}
              role="button"
              aria-hidden
            >
              {item}
            </div>
          ))}
        </div>
        <button type="button" className={styles.button} onClick={validation}>확인</button>
      </div>
    </div>
  );
}
