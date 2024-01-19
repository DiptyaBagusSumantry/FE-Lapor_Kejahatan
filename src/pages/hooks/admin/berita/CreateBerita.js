import Api from '@/pages/lib/axios';
import { useMutation } from '@tanstack/react-query';

export const CreateBerita = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await Api.post('/berita', data);

      return response;
    },
    onSuccess,
    onError,
  });
  return {
    mutate,
  };
};
