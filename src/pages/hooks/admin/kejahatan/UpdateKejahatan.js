import { useMutation } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const UpdateKejahatan = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await Api.put(`/kejahatan/${data.id}`, data);
      return response;
    },
    onSuccess,
    onError,
  });
  return {
    mutate,
  };
};
