import Image from 'next/image'
import React from 'react'

export default function ContactUs() {
  return (
    <div>
        <h1 className='text-center text-black text-[58px] mt-[40px] mb-[74px]'>Kontak</h1>
        <div className='bg-[#E2CEBD] border px-[41px] py-[38px] mx-[61px]'>
          <div className='flex items-start justify-between gap-[42px] mb-[87px]'>
            <Image src={"/assets/images/kontakMap.png"} width={760} height={384}/>
            <div className='text-3xl '>
              <h1 className='mb-[23px]'>Kantor</h1>
              <h1>Jalan DI Panjaitan No. 126, Karangreja, Purwokerto Kidul, Kec. Purwokerto Sel., Kabupaten Banyumas, Jawa Tengah 53147</h1>
            </div>
          </div>
          <div className='text-4xl space-y-[29px]'>
            <h1>Info Kontak</h1>
            <h1>085240252145</h1>
            <h1>websitepengaduan@gmail.com</h1>
          </div>
        </div>
    </div>
  )
}
