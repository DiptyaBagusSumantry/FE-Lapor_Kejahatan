'use client';

import Api from '@/lib/axios'
import { useMutation } from 'react-query'

export default function PostLoginUser({ onSuccess, onError }) {
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await Api.post('/login', data);
      return response;
    },
    onSuccess,
    onError,
  })

  return {
    mutate,
  }
}