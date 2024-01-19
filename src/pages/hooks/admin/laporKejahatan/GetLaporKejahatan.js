import { useQuery } from '@tanstack/react-query';

import Api from '../../../lib/axios';

export const GetLaporKejahatan = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get.admin'],
    queryFn: async () => {
      const response = await Api.get(`/laporan-kejahatan`);
      return response;
    },
  });

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
};
