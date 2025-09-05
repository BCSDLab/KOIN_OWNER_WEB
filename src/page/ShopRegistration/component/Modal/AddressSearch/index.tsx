import useAddress from 'query/address';
import { Juso } from 'model/shopInfo/address';
import CustomButton from 'page/Auth/Signup/CustomButton';
import styles from './AddressSearch.module.scss';

interface AddressSearchProps {
  onSelect: (address: Juso) => void;
  onClose?: () => void;
}

export default function AddressSearch({ onSelect, onClose }: AddressSearchProps) {
  const {
    address, changeAddress, search, addressData,
  } = useAddress();

  const jusoList: Juso[] = addressData?.addresses ?? [];

  const handlePick = (addr: Juso) => {
    onSelect(addr);
    onClose?.();
  };

  return (
    <div className={styles['address-search']}>
      <form
        className={styles['address-search__form']}
        onSubmit={(e) => {
          e.preventDefault();
          search();
        }}
      >
        <input
          className={styles['address-search__input']}
          placeholder="주소를 입력해주세요"
          value={address}
          onChange={(e) => changeAddress(e.target.value)}
        />
        <CustomButton submit content="검색" buttonSize="small" />
      </form>

      {!!addressData && (
        <div className={styles['address-search__result-list']}>
          {jusoList.length > 0 ? (
            <ul className={styles['address-search__result-list-ul']}>
              {jusoList.map((a) => {
                const title = a.bd_nm === '' ? a.road_address : a.bd_nm;
                const subtitle = a.road_address;
                const key = `${a.zip_no}-${a.road_address}`;
                return (
                  <li key={key} className={styles['address-search__result-list-item']}>
                    <button
                      type="button"
                      className={styles['address-search__result-list-button']}
                      onClick={() => handlePick(a)}
                    >
                      <div className={styles['address-search__result-title']}>{title}</div>
                      <div className={styles['address-search__result-subtitle']}>{subtitle}</div>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className={styles['address-search__result-list-empty']}>검색 결과가 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
}
