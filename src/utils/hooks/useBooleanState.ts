import { useState } from 'react';

export default function useBooleanState(defaultValue?: boolean) {
  const [value, setValue] = useState(!!defaultValue);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const changeValue = () => setValue((x) => !x);

  return {
    value, setValue, setTrue, setFalse, changeValue,
  } as const;
}
