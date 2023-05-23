import { create } from 'zustand';

interface StepStore {
  step: number;
  setStep: (step: number) => void;
  clickBackArrow: () => void;
}
const useStepStore = create<StepStore>((set) => ({
  step: 0,
  setStep: (step) => set({ step }),
  clickBackArrow: () => set((state) => ({ step: state.step - 1 })),
}));

export default useStepStore;
