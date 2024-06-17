import { OptionPrices } from 'store/addMenu';
import styles from './PriceDisplay.module.scss';

interface PriceDisplayProps {
  singlePrice: number;
  isSingle: boolean;
  optionPrices: OptionPrices[] | null
}

export default function PriceDisplay({
  singlePrice,
  isSingle,
  optionPrices,
}: PriceDisplayProps) {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.header__title}>가격</div>
      </div>
      {isSingle ? (
        <div>
          <div className={styles.price}>
            <div>
              {singlePrice}
              원
            </div>
          </div>
        </div>
      ) : (
        (optionPrices || []).map((input) => (
          <div key={input.id}>
            <div className={styles.price}>
              <div>
                {input.option}
              </div>
              <div>/</div>
              <div>
                {input.price}
                원
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}
