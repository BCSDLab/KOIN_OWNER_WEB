import { useState } from 'react';
import CustomButton from 'page/Auth/Signup/CustomButton';
import useAddress from 'query/address';
import { Juso } from 'model/shopInfo/address';
import styles from './AddressSearch.module.scss';

interface AddressSearchProps {
  onSelect: (address: Juso) => void;
  onClose: () => void;
}

export default function AddressSearch({ onSelect, onClose }: AddressSearchProps) {
  const [keywordInput, setKeywordInput] = useState('');
  const [searchedKeyword, setSearchedKeyword] = useState('');

  const { addressData } = useAddress(searchedKeyword);

  const handleSearchClick = () => {
    setSearchedKeyword(keywordInput);
  };

  const handlePick = (addr: Juso) => {
    onSelect(addr);
    onClose();
  };

  const addresses: Juso[] = addressData?.addresses ?? [];

  return (
    <div className={styles['address-search']}>
      <div className={styles['address-search__form']}>
        <input
          className={styles['address-search__input']}
          placeholder="주소를 입력해주세요"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
        />
        <CustomButton content="검색" buttonSize="small" onClick={handleSearchClick} />
      </div>

      {searchedKeyword && (
        <div className={styles['address-search__result-list']}>
          {addresses.length > 0 ? (
            <ul className={styles['address-search__result-list-ul']}>
              {addresses.map((address) => {
                const title = address.bd_nm === '' ? address.road_address : address.bd_nm;
                const subtitle = address.road_address;
                const key = `${address.zip_no}-${address.road_address}`;
                return (
                  <li key={key} className={styles['address-search__result-list-item']}>
                    <button
                      type="button"
                      className={styles['address-search__result-list-button']}
                      onClick={() => handlePick(address)}
                    >
                      <div className={styles['address-search__result-title']}>
                        {title}
                      </div>
                      <div className={styles['address-search__result-subtitle']}>
                        {subtitle}
                      </div>
                    </button>

                  </li>
                );
              })}
            </ul>
          ) : (
            <div className={styles['address-search__result-list-empty']}>
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
