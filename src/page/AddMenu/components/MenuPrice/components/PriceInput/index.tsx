import { OptionPrices } from 'store/addMenu';
import { ReactComponent as MobileDeleteIcon } from 'assets/svg/addmenu/mobile-delete-icon.svg';
import { ReactComponent as DeleteIcon } from 'assets/svg/addmenu/delete-icon.svg';
import { ReactComponent as MobilePlusIcon } from 'assets/svg/addmenu/mobile-plus-icon.svg';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import styles from './PriceInput.module.scss';

interface PriceInputProps {
  singlePrice: number;
  isSingle: boolean;
  optionPrices: OptionPrices[] | null
  setSinglePrice: (price: number) => void;
  updatePriceInput: (inputId: number, field: string, newValue: string | number) => void;
  deletePriceInput: (price: number) => void;
  addPriceInput: () => void;
}

export default function PriceInput({
  singlePrice,
  isSingle,
  optionPrices,
  setSinglePrice,
  updatePriceInput,
  deletePriceInput,
  addPriceInput,
}: PriceInputProps) {
  const { isMobile } = useMediaQuery();

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header__title}>가격</div>
      </div>
      {isSingle ? (
        <div className={styles['price-box']}>
          <div className={styles.inputs}>
            <div className={styles['inputs__price-input-box']}>
              <input
                type="number"
                className={styles['inputs__price-input']}
                inputMode="decimal"
                value={
                  singlePrice === 0 || singlePrice === null ? '' : singlePrice
                }
                onChange={(e) => setSinglePrice(e.target.value === '' ? 0 : Number(e.target.value))}
                onWheel={(e) => {
                  if (e.target instanceof HTMLElement) e.target.blur();
                }}
              />
              <p className={styles['inputs__price-input-won']}>
                원
              </p>
            </div>
          </div>
        </div>
      ) : (
        (optionPrices || []).map((input) => (
          <div
            key={input.id}
            className={styles['price-info-input-box']}
          >
            <div className={styles.inputs}>
              <input
                className={styles['inputs__size-input']}
                placeholder="예) 소 (1~2 인분)"
                value={input.option}
                onChange={(e) => updatePriceInput(input.id, 'option', e.target.value)}
                disabled={isSingle}
              />
              <div className={styles['inputs__price-input-box']}>
                <input
                  type="number"
                  className={styles['inputs__price-input']}
                  inputMode="decimal"
                  value={input.price === 0 ? '' : input.price}
                  onChange={(e) => updatePriceInput(input.id, 'price', Number(e.target.value))}
                />
                <p className={styles['inputs__price-input-won']}>
                  원
                </p>
              </div>
            </div>
            <button
              type="button"
              className={styles.cancle}
              onClick={() => deletePriceInput(input.id)}
            >
              {isMobile
                ? <MobileDeleteIcon className={styles.cancel__icon} />
                : <DeleteIcon className={styles.cancel__icon} />}
            </button>
          </div>
        ))
      )}
      <button
        type="button"
        className={styles['add-price-button']}
        onClick={addPriceInput}
      >
        <MobilePlusIcon className={styles['add-price-button__icon']} />
        <span className={styles['add-price-button__text']}>
          사이즈 추가
        </span>
      </button>
    </>
  );
}
