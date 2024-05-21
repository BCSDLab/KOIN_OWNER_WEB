import { ReactElement, ReactNode, useState } from 'react';

export interface StepProps {
  name: string;
  children: ReactNode;
}

export interface FunnelProps {
  children: ReactElement<StepProps>[];
}

export const useFunnel = (defaultStep: string) => {
  const [step, setStep] = useState(defaultStep);

  const Step = (props: StepProps): ReactElement | any => props.children;

  function Funnel({ children }: FunnelProps): ReactElement | null {
    const targetStep = children.find((child) => child.props.name === step);

    if (!targetStep) {
      return null;
    }

    return targetStep;
  }

  return {
    Funnel, Step, setStep, currentStep: step,
  } as const;
};
