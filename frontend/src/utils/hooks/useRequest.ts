import type { AxiosError } from "axios";
import { useCallback, useState } from "react";

export function useRequest<T, A extends unknown[]>(
  fn: (...args: A) => Promise<T>
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (...args: A): Promise<T | null> => {
      try {
        setIsLoading(true);
        setError(null);
        return await fn(...args);
      } catch (err) {
        const axiosErr = err as AxiosError<{ message?: string }>;
        const message = axiosErr.response?.data?.message || "Request failed";
        setError(message);

        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [fn]
  );

  return { execute, isLoading, error };
}
