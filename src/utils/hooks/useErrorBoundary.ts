import { useEffect, useState } from 'react';
import { ZodError } from 'zod';

export default function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);

  const handleErrorBoundary = (e: Error) => {
    if (e instanceof ZodError) {
      setError(e);
    } else {
      throw e;
    }
  };

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return { error, handleErrorBoundary };
}
