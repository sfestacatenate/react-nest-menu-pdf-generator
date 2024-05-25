import { useState } from 'react';

interface UpdateResult<T> {
  update: (updatedData: T) => Promise<void>;
  data: T | null;
  error: Error | null;
  loading: boolean;
}

const useUpdate = <T>(url: string): UpdateResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const update = async (updatedData: T) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
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

  return { update, data, error, loading };
};

export default useUpdate;
