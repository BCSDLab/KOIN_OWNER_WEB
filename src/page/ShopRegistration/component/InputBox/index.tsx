import type { UseFormRegister } from 'react-hook-form';
import { OwnerShop } from 'model/shopInfo/ownerShop';
import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import useShopRegistrationStore from 'store/shopRegistration';
import styles from './InputBox.module.scss';

interface InputBoxProps {
  content: string;
  id: keyof OwnerShop
  register: UseFormRegister<OwnerShop>;
  inputType: HTMLInputTypeAttribute;
}

function formatPhoneNumber(inputNumber: string) {
  const phoneNumber = inputNumber.replace(/\D/g, '');

  const formattedPhoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

  return formattedPhoneNumber;
}

export default function InputBox({
  content, id, register, inputType,
}: InputBoxProps) {
  const {
    setAddress, setPhone, setDeliveryPrice, setDescription,
  } = useShopRegistrationStore();

  const {
    address, phone, deliveryPrice, description,
  } = useShopRegistrationStore();

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (id === 'address') setAddress(inputValue);
    if (id === 'delivery_price') setDeliveryPrice(Number(inputValue));
    if (id === 'description') setDescription(inputValue);
    if (id === 'phone') {
      const formattedNumber = formatPhoneNumber(inputValue);
      setPhone(formattedNumber);
    }
  };

  const getValue = () => {
    if (id === 'address') return address;
    if (id === 'delivery_price') return deliveryPrice;
    if (id === 'description') return description;
    return phone;
  };
  return (
    <label htmlFor={id} className={styles.form}>
      <span className={styles.form__label}>{content}</span>
      <input
        type={inputType}
        id={id}
        className={styles.form__input}
        {...register(id)}
        onChange={handleValueChange}
        value={getValue()}
      />
    </label>
  );
}
