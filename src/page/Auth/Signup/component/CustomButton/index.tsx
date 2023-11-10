import styles from './CustomButton.module.scss';

interface ButtonProps {
  content:string,
  buttonSize: 'small' | 'mobile' | 'large',
  disable?: boolean,
  submit?:boolean
  onClick?: () => void
}

export default function CustomButton({
  content, buttonSize, disable, onClick, submit,
}:ButtonProps) {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={`${styles[`button--${buttonSize}`]}`}
      onClick={onClick}
      disabled={!!disable}
    >
      {content}
    </button>
  );
}
