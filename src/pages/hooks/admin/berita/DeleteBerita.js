import { useMutation } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const DeleteBerita = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async (id) => {
      const response = await Api.delete(`/berita/${id}`);

      return response;
    },
    onSuccess,
    onError,
  });
  return {
    mutate,
  };
};
