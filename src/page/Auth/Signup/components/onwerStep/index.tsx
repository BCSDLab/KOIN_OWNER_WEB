import { useState } from 'react';
import AttachStep from './AttachStep';
import NameStep from './nameStep';
import OnwerNumberStep from './onwerNumberStep';
import ShopStep from './shopStep';

interface Props {
  complete: () => void;
}

export default function OwnerStep({ complete }: Props) {
  const [steps, setSteps] = useState(0);
  const nextStep = () => setSteps((prev) => prev + 1);

  if (steps === 0) return <NameStep nextStep={() => nextStep()} />;

  if (steps === 1) {
    return <ShopStep nextStep={() => nextStep()} />;
  }

  if (steps === 2) {
    return <OnwerNumberStep nextStep={() => nextStep()} />;
  }

  return (
    <AttachStep nextStep={complete} />
  );
}
