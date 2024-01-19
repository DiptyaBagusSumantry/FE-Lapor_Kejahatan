import { useQuery } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const GetByIdBerita = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get.berita.id', id],
    queryFn: async () => {
      const response = await Api.get(`/berita/${id}`);
      return response;
    },
  });

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
};
