import cn from 'utils/ts/className';
import Error from 'assets/svg/auth/error-icon.svg?react';
import Success from 'assets/svg/auth/success.svg?react';
import styles from './form.module.scss';

interface InputProps {
  type?: string;
  placeholder?: string;
  register: any;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputMode?: string;
  required?: boolean;
  pattern?: RegExp;
  requiredMessage?: string;
  patternMessage?: string;
  maxLength?: number;
  component?: React.ReactNode;
}

interface ButtonProps {
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  onSubmit?: () => void;
  type?: 'button' | 'submit' | 'reset';
  primary?: boolean;
  secondary?: boolean;
  info?: boolean;
}

interface ValidationMessageProps {
  message?: string;
  isError: boolean;
}

export function Title({ title }: { title: string }) {
  return (
    <div className={styles.title}>{title}</div>
  );
}

export function ValidationMessage({ message, isError }: ValidationMessageProps) {
  if (isError) {
    return (
      <div className={styles['message-container--error']}>
        <Error />
        {message}
      </div>
    );
  }

  return (
    <div className={styles['message-container--success']}>
      {message && <Success />}
      {message}
    </div>
  );
}

export function Input({
  type = 'text', placeholder, register, onChange, inputMode, name, required, pattern,
  requiredMessage, patternMessage, maxLength, component,
}: InputProps) {
  return (
    <div className={styles['input-container']}>
      <input
        {...register(name, {
          required: {
            value: required,
            message: requiredMessage,
          },
          pattern: pattern ? {
            value: pattern,
            message: patternMessage,
          } : undefined,
          onChange,
        })}
        className={styles.input}
        placeholder={placeholder}
        type={type}
        inputMode={inputMode}
        maxLength={maxLength}
      />
      <div className={styles.timer}>
        {component}
      </div>
    </div>
  );
}

export function Button({
  disabled = false, children, onClick, type = 'button', onSubmit, primary = true, secondary = false, info = false,
}: ButtonProps) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick}
      onSubmit={onSubmit ? ((e) => {
        e.preventDefault();
        onSubmit();
      }) : undefined}
      disabled={disabled}
      className={cn({
        [styles.button]: primary,
        [styles.button__secondary]: secondary,
        [styles.button__info]: info,
        [styles.button__disabled]: disabled,
      })}
    >
      {children}
    </button>
  );
}
