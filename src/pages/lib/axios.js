import axios from 'axios'

const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
console.log(token, 'tokenlihat')

const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: token ? `Bearer ${'token'}` : ''
  }
})

export default Api