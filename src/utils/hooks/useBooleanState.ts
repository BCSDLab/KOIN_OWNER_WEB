import { useCallback, useState } from 'react';

export default function useBooleanState(defaultValue?: boolean) {
  const [value, setValue] = useState(!!defaultValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const changeValue = useCallback(() => setValue((x) => !x), []);

  return [
    value, setValue, setTrue, setFalse, changeValue,
  ] as const;
}
