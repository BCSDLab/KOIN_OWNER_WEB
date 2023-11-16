import type { UseFormRegister } from 'react-hook-form';
import { OwnerShop } from 'model/shopInfo/ownerShop';
import { HTMLInputTypeAttribute } from 'react';
import styles from './InputBox.module.scss';

interface InputProps {
  content: string;
  id: keyof OwnerShop
  register: UseFormRegister<OwnerShop>;
  inputType: HTMLInputTypeAttribute;
}

export default function InputBox({
  content, id, register, inputType,
}: InputProps) {
  return (
    <label htmlFor={id} className={styles.form}>
      <span className={styles.form__label}>{content}</span>
      <input
        type={inputType}
        id={id}
        className={styles.form__input}
        {...register(id)}
      />
    </label>
  );
}
