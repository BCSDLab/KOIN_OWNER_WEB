import styles from './CustomButton.module.scss';

interface ButtonProps {
  content:string,
  // 80px | 부모 요소의 절반 width | 부모요소 전체 width | 83px
  buttonSize: 'small' | 'mobile' | 'large' | 'mobile-small',
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
