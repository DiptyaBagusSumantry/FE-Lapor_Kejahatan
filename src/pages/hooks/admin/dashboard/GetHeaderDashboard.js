import Api from "@/pages/lib/axios";
import { useQuery } from "react-query";

export const GetHeaderDashboard = () => {

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['get.header'],
        queryFn: async () => {
        const response = await Api.get(`/header`);
        console.log(response, 'response')
        return response;
        }
    });

    return {
        data: data?.data,
        isLoading,
        refetch,
    };
};
