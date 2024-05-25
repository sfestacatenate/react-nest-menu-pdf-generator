import { useState } from 'react';

interface CreateResult<T> {
  create: (newData: T) => Promise<void>;
  data: T | null;
  error: Error | null;
  loading: boolean;
}

const useCreate = <T>(url: string): CreateResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const create = async (newData: T) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result: T = await response.json();
      setData(result);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { create, data, error, loading };
};

export default useCreate;
