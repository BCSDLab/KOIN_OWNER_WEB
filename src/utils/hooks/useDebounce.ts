import { useState } from 'react';

export function useDebounce<T>(func: (data: T) => void, param: T, delay?: number): () => void {
  const [id, setId] = useState<null | NodeJS.Timeout>(null);

  const debounce = () => {
    if (id) clearTimeout(id);
    const timeId = setTimeout(() => func(param), delay ?? 200);
    setId(timeId);
  };

  return debounce;
}
