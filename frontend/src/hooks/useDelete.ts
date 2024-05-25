import { useState } from 'react';

interface DeleteResult {
  remove: () => Promise<void>;
  data: boolean | null;
  error: Error | null;
  loading: boolean;
}

const useDelete = (url: string): DeleteResult => {
  const [data, setData] = useState<boolean | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const remove = async () => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setData(true);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { remove, data, error, loading };
};

export default useDelete;
