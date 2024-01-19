import { useMutation } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const DeleteKejahatan = ({ onSuccess, onError }) => {
  const { mutate } = useMutation({
    mutationFn: async (id) => {
      const response = await Api.delete(`/admin/delete/${id}`);

      return response;
    },
    onSuccess,
    onError,
  });
  return {
    mutate,
  };
};
