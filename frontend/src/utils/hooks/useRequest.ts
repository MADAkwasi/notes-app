import { useState } from "react";
import { AxiosError } from "axios";

export function useRequest<T, A extends unknown[]>(
  fn: (...args: A) => Promise<T>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (...args: A): Promise<T> => {
    try {
      setLoading(true);
      setError(null);

      return await fn(...args);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;

      const message = axiosErr.response?.data?.message || "Request failed";

      setError(message);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
}
