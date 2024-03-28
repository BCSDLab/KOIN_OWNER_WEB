import useMediaQuery from 'utils/hooks/useMediaQuery';
import useAddMenuStore from 'store/addMenu';
import styles from './MenuPrice.module.scss';

interface MenuPriceProps {
  isComplete : boolean;
}

export default function MenuPrice({ isComplete }:MenuPriceProps) {
  const { isMobile } = useMediaQuery();
  const {
    optionPrices,
    isSingle,
    singlePrice,
    setSinglePrice,
  } = useAddMenuStore();

  return (
    <div>
      {isMobile ? (
        <div className={styles.mobile__container}>
          {isComplete ? (
            <>
              <div className={styles.mobile__header}>
                <div className={styles['mobile__header-title--complete']}>가격</div>
              </div>
              <div className={styles['mobile__price-info-text-box']}>
                <div className={styles['mobile__price-info-text']}>
                  <div className={styles['mobile__price-info-text__price']}>
                    {singlePrice}
                    원
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.mobile__header}>
                <div className={styles['mobile__header-title']}>가격</div>
              </div>
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
            </>
          )}
        </div>
      )}
    </div>
  );
}
