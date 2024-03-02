import { create } from 'zustand';

interface StepStore {
  TOTAL_STEP: number;
  step: number;
  setStep: (step: number) => void;
  decreaseStep: () => void;
  increaseStep: () => void;
}
const useStepStore = create<StepStore>((set) => ({
  TOTAL_STEP: 4,
  step: 0,
  setStep: (step) => set({ step }),
  decreaseStep: () => set((state) => ({ step: state.step - 1 })),
  increaseStep: () => set((state) => ({ step: state.step + 1 })),
}));

export default useStepStore;
