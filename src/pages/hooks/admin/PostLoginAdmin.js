import Api from '@/pages/lib/axios';
import { useMutation } from 'react-query'

export default function PostLoginAdmin({ onSuccess, onError }) {
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await Api.post('/login', data);
      // console.log(response, 'res')
      return response;
    },
    onSuccess,
    onError,
  })

  return {
    mutate,
  }
}