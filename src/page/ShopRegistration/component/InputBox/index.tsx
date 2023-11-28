import type { UseFormRegister } from 'react-hook-form';
import { OwnerShop } from 'model/shopInfo/ownerShop';
import { HTMLInputTypeAttribute, useState } from 'react';
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
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumber = e.target.value;
    const formattedNumber = formatPhoneNumber(inputNumber);
    setFormattedPhoneNumber(formattedNumber);
  };
  return (
    <label htmlFor={id} className={styles.form}>
      <span className={styles.form__label}>{content}</span>
      <input
        type={inputType}
        id={id}
        className={styles.form__input}
        {...register(id)}
        onChange={inputType === 'tel' ? handlePhoneChange : undefined}
        value={inputType === 'tel' ? formattedPhoneNumber : undefined}
      />
    </label>
  );
}
