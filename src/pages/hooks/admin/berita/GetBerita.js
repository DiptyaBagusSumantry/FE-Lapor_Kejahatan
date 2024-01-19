import { useQuery } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const GetBerita = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get.berita'],
    queryFn: async () => {
      const response = await Api.get(`/berita`);
      return response;
    },
  });

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
};
