import { useMutation } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const UpdateBerita = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await Api.put(`/berita/${data.id}`, data);
      return response;
    },
    onSuccess,
    onError,
  });
  return {
    mutate,
  };
};
