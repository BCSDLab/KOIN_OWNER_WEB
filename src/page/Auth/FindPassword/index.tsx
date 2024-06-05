import { useOutletContext } from 'react-router-dom';
// eslint-disable-next-line
import Verify from './Verify';

export interface OutletProps {
  nextStep: () => void;
  previousStep: () => void;
  currentStep: string;
  index: number;
  totalStep: number;
  isComplete: boolean;
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FindPassword() {
  const steps: OutletProps = useOutletContext();
  const { index } = steps;
  return (
    <>
      {index === 0 && <Verify />}
      {index === 1 && <div>비밀번호 변경</div>}
    </>
  );
}
