import { useState, useEffect } from 'react';

interface FetchResult<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  refresh: () => void;
}

const useFetch = <T>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
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

  const refresh = async () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, error, loading, refresh };
};

export default useFetch;
