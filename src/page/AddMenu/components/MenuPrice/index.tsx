import useMediaQuery from 'utils/hooks/useMediaQuery';
import useAddMenuStore from 'store/addMenu';
import PriceDisplay from './components/PriceDisplay';
import PriceInput from './components/PriceInput';
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
      setOptionPrices([]);
    }
  };

  return (
    <div>
      {isMobile ? (
        <div className={styles.mobile__container}>
          {isComplete ? (
            <PriceDisplay
              singlePrice={singlePrice}
              isSingle={isSingle}
              optionPrices={optionPrices}
            />
          ) : (
            <PriceInput
              singlePrice={singlePrice}
              isSingle={isSingle}
              optionPrices={optionPrices}
              setSinglePrice={setSinglePrice}
              updatePriceInput={updatePriceInput}
              addPriceInput={addPriceInput}
              deletePriceInput={deletePriceInput}
            />
          )}
        </div>
      ) : (
        <div className={styles.container}>
          {
            isComplete ? (
              <PriceDisplay
                singlePrice={singlePrice}
                isSingle={isSingle}
                optionPrices={optionPrices}
              />
            ) : (
              <PriceInput
                singlePrice={singlePrice}
                isSingle={isSingle}
                optionPrices={optionPrices}
                setSinglePrice={setSinglePrice}
                updatePriceInput={updatePriceInput}
                addPriceInput={addPriceInput}
                deletePriceInput={deletePriceInput}
              />
            )
          }
        </div>
      )}
    </div>
  );
}
