export interface OutletProps {
  nextStep: () => void;
  previousStep: () => void;
  currentStep: string;
  index: number;
  totalStep: number;
  isComplete: boolean;
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
  isStepComplete: boolean;
  setIsStepComplete: React.Dispatch<React.SetStateAction<boolean>>;
  isSearch: boolean;
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
  isShopSelect: boolean;
  setIsShopSelect: React.Dispatch<React.SetStateAction<boolean>>;
}
