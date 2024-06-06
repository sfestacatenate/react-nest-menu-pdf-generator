import { useState } from 'react';

interface DeleteResult {
  remove: (menuId: number) => Promise<number>;
  error: Error | null;
  loading: boolean;
}

const useDelete = (url: string): DeleteResult => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const remove = async (menuId: number): Promise<number> => {
    setLoading(true);
    try {
      const completeUrl = `${url}/${menuId}`; 
      const response = await fetch(completeUrl, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return menuId;
    } catch (error) {
      setError(error as Error);
      return 0;
    } finally {
      setLoading(false);
    }
  };

  return { remove, error, loading };
};

export default useDelete;
