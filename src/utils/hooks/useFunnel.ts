import { ReactElement, useState } from 'react';

export interface StepProps {
  name: string;
  children: ReactElement;
}

export interface FunnelProps {
  children: ReactElement<StepProps>[];
}

export const useFunnel = (defaultStep: string) => {
  const [step, setStep] = useState(defaultStep);

  const Step = (props: StepProps) => props.children;

  function Funnel({ children }: FunnelProps): ReactElement | null {
    const targetStep = children.find((childStep) => childStep.props.name === step);

    return targetStep ?? null;
  }

  return {
    Funnel, Step, setStep, currentStep: step,
  } as const;
};
