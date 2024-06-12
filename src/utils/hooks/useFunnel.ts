import { ReactElement, useState } from 'react';

export interface StepProps {
  name: string;
  children: ReactElement;
}

export interface FunnelProps {
  children: ReactElement<StepProps>[];
}

/**
* 단계별 입력 폼을 진행할 시 사용 권장
* @param { string } defaultStep 시작할 초기 단계
* @returns { Funnel, Step, setStep, currentStep } 단계별 입력 폼을 관리하는데 사용하는 유틸리티
*/
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
