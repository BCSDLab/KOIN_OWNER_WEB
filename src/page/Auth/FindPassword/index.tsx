import { useOutletContext } from 'react-router-dom';
import ChangePassword from './ChangePassword';
import { OutletProps } from './entity';
import Verify from './Verify';

export default function FindPassword() {
  const steps = useOutletContext<OutletProps>();
  const { index } = steps;
  return (
    <>
      {index === 0 && <Verify />}
      {index === 1 && <ChangePassword />}
    </>
  );
}
