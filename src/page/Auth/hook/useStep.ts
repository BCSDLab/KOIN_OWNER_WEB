import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Type = 'find' | 'register';

const findPassword = [
  '계정 인증', '비밀번호 변경',
];

const register = ['약관 동의', '기본 정보 입력', '사업자 인증'];

export const useStep = (type: Type) => {
  const target = type === 'find' ? findPassword : register;
  const [index, setIndex] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isStepComplete, setIsStepComplete] = useState<boolean>(false);
  const [isShopSelect, setIsShopSelect] = useState<boolean>(false);
  const navigate = useNavigate();

  const nextStep = () => {
    if (isStepComplete && index + 1 < target.length) {
      setIndex((prev) => prev + 1);
      setIsStepComplete(false);
    } else if (isStepComplete && index + 1 === target.length) {
      setIsComplete(true);
    }
  };

  const previousStep = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
      setIsStepComplete(true); // step을 통과한 사람만 뒤로 갈 수 있음
    } else navigate(-1);
  };

  const currentStep = target[index];
  const totalStep = target.length;

  return {
    nextStep,
    previousStep,
    currentStep,
    index,
    totalStep,
    isComplete,
    setIsComplete,
    isStepComplete,
    setIsStepComplete,
    isSearch,
    setIsSearch,
    isShopSelect,
    setIsShopSelect,
  };
};
