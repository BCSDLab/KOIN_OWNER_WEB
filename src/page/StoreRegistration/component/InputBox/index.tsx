import type { UseFormRegister } from 'react-hook-form';
import { OwnerShop } from 'model/shopInfo/ownerShop';
import styles from './InputBox.module.scss';

interface InputProps {
  content: string;
  id: keyof OwnerShop
  register: UseFormRegister<OwnerShop>;
  isNumber?: boolean;
}

export default function InputBox({
  content, id, register, isNumber,
}: InputProps) {
  return (
    <label htmlFor={id} className={styles.form}>
      <span className={styles.form__label}>{content}</span>
      <input
        type={isNumber ? 'number' : 'text'}
        id={id}
        className={styles.form__input}
        {...register(id)}
      />
    </label>
  );
}
