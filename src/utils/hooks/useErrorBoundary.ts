import { useEffect, useState } from 'react';

export default function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return { error, setError };
}
