import ShowIcon from 'assets/svg/auth/show.svg?react';
import BlindIcon from 'assets/svg/auth/blind.svg?react';

interface Props {
  isBlind: boolean;
  onClick: () => void;
  classname?: string;
}

export default function BlindButton({ isBlind, onClick, classname }: Props) {
  return (
    <button
      type="button"
      className={classname}
      onClick={onClick}
    >
      {isBlind ? <BlindIcon aria-hidden /> : <ShowIcon aria-hidden />}
    </button>
  );
}
