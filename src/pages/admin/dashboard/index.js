import api from '@/pages/api/hello';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DashboardAdmin() {
  const [dataHeader, setDataHeader] = useState('')
  const [dataFetch, setDataFetch] = useState('')
  const route = useRouter()

  const getDataHeader = async () => {
    try {
      const res = await api.GetHeaderDashboard(localStorage.getItem('token'))
      setDataHeader(res.data)
      console.log(res, 'response')
    } catch (error) {
      console.log(error)
    }
  }

  const getDataFetch = async () => {
    try {
      const res = await api.GetFetch(localStorage.getItem('token'))
      console.log(res, 'response fetch')
    } catch (error) {
      console.log(error)
    }
  }

  // if (!dataFetch){
  //   route.push('/')
  //   localStorage.removeItem('token')
  // }

  useEffect(() => {
    getDataHeader()
    getDataFetch()
  }, [])
  

  return (  
      <div className='px-[25px] py-[55px] w-fit'>
        <div className='flex gap-[17px] items-center justify-center'>
          <div className='w-[311px] h-32 bg-stone-200 flex items-center justify-between'>
            <div className='flex items-center text-[20px] font-semibold px-7 gap-2'>
              <h1>Total Laporan Masuk:</h1>
              <h1 className='text-red-500 text-[45px]'>{dataHeader.totalMasuk}</h1>
            </div>
          </div>
          <div className='w-[311px] h-32 bg-stone-200 flex items-center justify-between'>
            <div className='flex items-center text-[20px] font-semibold px-7 gap-2'>
              <h1>Total Laporan Belum Ditanggapi:</h1>
              <h1 className='text-red-500 text-[45px]'>{dataHeader.belumDitanggapi}</h1>
            </div>
          </div>
          <div className='w-[311px] h-32 bg-stone-200 flex items-center justify-between'>
            <div className='flex items-center text-[20px] font-semibold px-7 gap-2'>
              <h1>Total Laporan Sudah Ditanggapi:</h1>
              <h1 className='text-red-500 text-[45px]'>{dataHeader.sudahDiTanggapi}</h1>
            </div>
          </div>
        </div>
        <img className='mt-[70px]' src="/assets/images/datakejahatanBanyumas.png" alt="kejahatanBanyumas" />
      </div> 
  )
}
