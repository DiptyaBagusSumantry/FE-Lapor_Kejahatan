import React, { useEffect, useState } from 'react'
import api from '../api/hello'

export default function index() {
  const [dataBerita, setDataBerita] = useState('')
  const getDataBerita = async () => {
    try {
      const res = await api.GetBerita()
      console.log(res)
      setDataBerita(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDataBerita()
  }, [])
  return (
    <div className='px-[61px] pb-[73px] '>
        <h1 className="text-center text-black text-[58px] font-normal mt-[41px] mb-[74px] ">Info Terkini</h1>
        <div className='grid grid-cols-3 gap-[27px] bg-[#E2CEBD] py-[50px] px-[16px] h-screen w-full'>
          {Object.values(dataBerita).map((item, idx) => (
            <div className='h-fit bg-white rounded-xl'>
              <img src="/assets/images/dashboard.jpeg" className='w-full mb-[21px] rounded-t-xl' alt="" />
              <div className='pb-[17px]'>
                <h1 className="text-center text-black text-opacity-80 text-[25px] font-bold underline mb-5">{item.title}</h1>
                <h1 className="text-center text-black text-opacity-80 text-sm font-normal underline">{item.deskripsi}</h1>
              </div>
            </div>

          ))}
        </div>
    </div>
  )
}
