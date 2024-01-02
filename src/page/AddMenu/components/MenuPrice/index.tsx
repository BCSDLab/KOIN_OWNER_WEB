import useMediaQuery from 'utils/hooks/useMediaQuery';
import { useState } from 'react';
import { ReactComponent as PlusIcon } from 'assets/svg/main/plus.svg';
import { ReactComponent as DeleteIcon } from 'assets/svg/addmenu/delete-icon.svg';
import { ReactComponent as MobileDeleteIcon } from 'assets/svg/addmenu/mobile-delete-icon.svg';
import { ReactComponent as CheckCircleIcon } from 'assets/svg/mystore/check-circle.svg';
import { ReactComponent as MobilePlusIcon } from 'assets/svg/addmenu/mobile-plus-icon.svg';
import styles from './MenuPrice.module.scss';

interface MenuPriceProps {
  isComplete : boolean;
}

export default function MenuPrice({ isComplete }:MenuPriceProps) {
  const { isMobile } = useMediaQuery();
  const [priceInputs, setPriceInputs] = useState([{ id: 1, size: '', price: '' }]);

  const updatePriceInput = (id: number, field: string, newValue: string) => {
    setPriceInputs(
      priceInputs.map((input) => (input.id === id ? { ...input, [field]: newValue } : input)),
    );
  };
  const addPriceInput = () => {
    setPriceInputs([...priceInputs, { id: priceInputs.length + 1, size: '', price: '' }]);
  };
  const deletePriceInput = (id : number) => {
    setPriceInputs(priceInputs.filter((input) => input.id !== id));
  };

  return (
    <div>
      {isMobile ? (
        <div className={styles.mobile__container}>
          {isComplete ? (
            <>
              <div className={styles.mobile__header}>
                <div className={styles['mobile__header-title--complete']}>가격</div>
              </div>
              {priceInputs.map((input) => (
                <div key={input.id} className={styles['mobile__price-info-text-box']}>
                  <div className={styles['mobile__price-info-text']}>
                    <div className={styles['mobile__price-info-text__size']}>
                      {input.size}
                    </div>
                    <div>
                      /
                    </div>
                    <div className={styles['mobile__price-info-text__price']}>
                      {input.price}
                      원
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className={styles.mobile__header}>
                <div className={styles['mobile__header-title']}>가격</div>
                <div className={styles['mobile__header-condition']}>
                  <div className={styles['mobile__header-condition__text']}>단일메뉴</div>
                  <CheckCircleIcon className={styles['mobile__header-condition__icon']} />
                </div>
              </div>
              {priceInputs.map((input) => (
                <div key={input.id} className={styles['mobile__price-info-input-box']}>
                  <div className={styles['mobile__price-info-inputs']}>
                    <input
                      className={styles['mobile__price-info-inputs__size-input']}
                      placeholder="예) 소 (1~2 인분)"
                      value={input.size}
                      onChange={(e) => updatePriceInput(input.id, 'size', e.target.value)}
                    />
                    <div className={styles['mobile__price-info-inputs__price-input-box']}>
                      <input
                        className={styles['mobile__price-info-inputs__price-input']}
                        value={input.price}
                        onChange={(e) => updatePriceInput(input.id, 'price', e.target.value)}
                      />
                      <p className={styles['mobile__price-info-inputs__price-input-won']}>원</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={styles['mobile__cancle-button']}
                    onClick={() => deletePriceInput(input.id)}
                  >
                    <MobileDeleteIcon className={styles['mobile__cancle-icon']} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className={styles['mobile__add-price-button']}
                onClick={addPriceInput}
              >
                <MobilePlusIcon className={styles['mobile__add-price-button__icon']} />
                <span className={styles['mobile__add-price-button__text']}>가격 추가</span>
              </button>
            </>
          )}
        </div>
      ) : (
        <div className={styles.container}>
          {isComplete ? (
            <>
              <div className={styles.header}>
                <div className={styles.header__title}>가격</div>
              </div>
              {priceInputs.map((input) => (
                <div key={input.id} className={styles['price-info-text-box']}>
                  <div className={styles['price-info-text']}>
                    <div className={styles['price-info-text__size']}>
                      {input.size}
                    </div>
                    <div>
                      /
                    </div>
                    <div className={styles['price-info-text__price']}>
                      {input.price}
                      원
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className={styles.header}>
                <div className={styles.header__title}>가격</div>
                <div className={styles.header__condition}>
                  <div className={styles['header__condition-text']}>단일메뉴</div>
                  <CheckCircleIcon className={styles['header__condition-icon']} />
                </div>
              </div>
              {priceInputs.map((input) => (
                <div key={input.id} className={styles['price-info-input-box']}>
                  <div className={styles['price-info-inputs']}>
                    <input
                      className={styles['price-info-inputs__size-input']}
                      placeholder="예) 소 (1~2 인분)"
                      value={input.size}
                      onChange={(e) => updatePriceInput(input.id, 'size', e.target.value)}
                    />
                    <div className={styles['price-info-inputs__price-input-box']}>
                      <input
                        className={styles['price-info-inputs__price-input']}
                        value={input.price}
                        onChange={(e) => updatePriceInput(input.id, 'price', e.target.value)}
                      />
                      <p className={styles['price-info-inputs__price-input-won']}>원</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={styles['cancle-button']}
                    onClick={() => deletePriceInput(input.id)}
                  >
                    <DeleteIcon className={styles['cancle-button__icon']} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className={styles['add-price-button']}
                onClick={addPriceInput}
              >
                <PlusIcon className={styles['add-price-button__icon']} />
                <div className={styles['add-price-button__text']}>가격 추가</div>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
