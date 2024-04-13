import useMediaQuery from 'utils/hooks/useMediaQuery';
import useAddMenuStore from 'store/addMenu';
import { ReactComponent as PlusIcon } from 'assets/svg/main/plus.svg';
import { ReactComponent as DeleteIcon } from 'assets/svg/addmenu/delete-icon.svg';
import { ReactComponent as MobileDeleteIcon } from 'assets/svg/addmenu/mobile-delete-icon.svg';
import { ReactComponent as MobilePlusIcon } from 'assets/svg/addmenu/mobile-plus-icon.svg';
import styles from './MenuPrice.module.scss';

interface MenuPriceProps {
  isComplete : boolean;
}

export default function MenuPrice({ isComplete }:MenuPriceProps) {
  const { isMobile } = useMediaQuery();
  const {
    optionPrices,
    setOptionPrices,
    isSingle,
    setIsSingle,
    singlePrice,
    setSinglePrice,
  } = useAddMenuStore();

  const updatePriceInput = (inputId: number, field: string, newValue: string | number) => {
    const updatedOptionPrices = (optionPrices || []).map((price) => {
      if (price.id === inputId) {
        return { ...price, [field]: newValue };
      }
      return price;
    });
    setOptionPrices(updatedOptionPrices);
  };

  const addPriceInput = () => {
    if (optionPrices) {
      const lastId = optionPrices.length > 0 ? optionPrices[optionPrices.length - 1].id : 0;
      const newId = lastId + 1;
      if (!isSingle) {
        setOptionPrices([...(optionPrices || []), { id: newId, option: '', price: 0 }]);
      } else {
        setIsSingle(false);
      }
    }
  };

  const deletePriceInput = (id: number) => {
    const updatedOptionPrices = optionPrices?.filter((item) => item.id !== id) || [];
    setOptionPrices(updatedOptionPrices);

    if (updatedOptionPrices.length === 0) {
      setIsSingle(true);
      setOptionPrices([{ id: 0, option: '', price: 0 }]);
    }
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
              {isSingle ? (
                <div className={styles['mobile__price-info-text-box']}>
                  <div className={styles['mobile__price-info-text']}>
                    <div className={styles['mobile__price-info-text__price']}>
                      {singlePrice}
                      원
                    </div>
                  </div>
                </div>
              )
                : (optionPrices || []).map((input) => (
                  <div key={input.id} className={styles['mobile__price-info-text-box']}>
                    <div className={styles['mobile__price-info-text']}>
                      <div className={styles['mobile__price-info-text__size']}>
                        {input.option}
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
              </div>
              {isSingle
                ? (
                  <div className={styles['mobile__price-info-input-box']}>
                    <div className={styles['mobile__price-info-inputs']}>
                      <div className={styles['mobile__price-info-inputs__price-input-box']}>
                        <input
                          type="number"
                          className={styles['mobile__price-info-inputs__price-input']}
                          value={singlePrice === 0 || singlePrice === null ? '' : singlePrice}
                          onChange={(e) => setSinglePrice(e.target.value === '' ? 0 : Number(e.target.value))}
                        />
                        <p className={styles['mobile__price-info-inputs__price-input-won']}>원</p>
                      </div>
                    </div>
                  </div>
                )
                : (optionPrices || []).map((input) => (
                  <div key={input.id} className={styles['mobile__price-info-input-box']}>
                    <div className={styles['mobile__price-info-inputs']}>
                      <input
                        className={styles['mobile__price-info-inputs__size-input']}
                        placeholder="예) 소 (1~2 인분)"
                        value={input.option}
                        onChange={(e) => updatePriceInput(input.id, 'option', e.target.value)}
                        disabled={isSingle}
                      />
                      <div className={styles['mobile__price-info-inputs__price-input-box']}>
                        <input
                          type="number"
                          className={styles['mobile__price-info-inputs__price-input']}
                          value={input.price === 0 ? '' : input.price}
                          onChange={(e) => updatePriceInput(input.id, 'price', Number(e.target.value))}
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
                <span className={styles['mobile__add-price-button__text']}>옵션 추가</span>
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
              {isSingle ? (
                <div className={styles['price-info-text-box']}>
                  <div className={styles['price-info-text']}>
                    <div className={styles['price-info-text__price']}>
                      {singlePrice}
                      원
                    </div>
                  </div>
                </div>
              )
                : (optionPrices || []).map((input) => (
                  <div key={input.id} className={styles['price-info-text-box']}>
                    <div className={styles['price-info-text']}>
                      <div className={styles['price-info-text__size']}>
                        {input.option}
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
              </div>
              {isSingle
                ? (
                  <div className={styles['price-info-input-box']}>
                    <div className={styles['price-info-inputs']}>
                      <div className={styles['price-info-inputs__price-input-box']}>
                        <input
                          type="number"
                          className={styles['price-info-inputs__price-input']}
                          value={singlePrice === 0 || singlePrice === null ? '' : singlePrice}
                          onChange={(e) => setSinglePrice(e.target.value === '' ? 0 : Number(e.target.value))}
                        />
                        <p className={styles['price-info-inputs__price-input-won']}>원</p>
                      </div>
                    </div>
                  </div>
                )
                : (optionPrices || []).map((input) => (
                  <div key={input.id} className={styles['price-info-input-box']}>
                    <div className={styles['price-info-inputs']}>
                      <input
                        className={styles['price-info-inputs__size-input']}
                        placeholder={isSingle ? '' : '예) 소 (1~2 인분)'}
                        value={input.option}
                        onChange={(e) => updatePriceInput(input.id, 'option', e.target.value)}
                        disabled={isSingle}
                      />
                      <div className={styles['price-info-inputs__price-input-box']}>
                        <input
                          type="number"
                          className={styles['price-info-inputs__price-input']}
                          value={input.price === 0 ? '' : input.price}
                          onChange={(e) => updatePriceInput(input.id, 'price', Number(e.target.value))}
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
                <div className={styles['add-price-button__text']}>옵션 추가</div>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
