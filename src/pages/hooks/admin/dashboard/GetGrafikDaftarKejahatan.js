import Api from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';


export const GetGrafikKejahatan = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get.grafik'],
    queryFn: async () => {
      const response = await Api.get(`/admin/get?limit=${limit}&page=${page}&fullname=${fullname}`);
      return response;
    },
  });

  return {
    data: data?.data,
    isLoading,
    refetch,
  };
};
