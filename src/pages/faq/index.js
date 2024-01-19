import React from 'react'

export default function FaqPage() {
  return (
    <div>
        <h1 className="text-center text-black text-[58px] mt-[40px] mb-[74px]">Frequently Ask Question</h1>
        <div className='bg-[#E2CEBD] h-fit mx-[61px] mb-[55px] py-[45px] px-[41px] space-y-[40px]'>
            <div className='bg-[#D9D9D9B2] text-3xl py-[21px] px-[22px] space-y-[19px]'>
                <h1>Q: Apa itu Website Lapor Kejahatan Banyumas?</h1>
                <h1>A: Website Lapor Kejahatan Banyumas adalah website yang dapat digunakan untuk melaporkan tindak kejahatan disekitar Banyumas.</h1>
            </div>
            <div className='bg-[#D9D9D9B2] text-3xl py-[21px] px-[22px] space-y-[19px]'>
                <h1>Q: Apa itu nomor pengaduan dan apa kegunaannya?</h1>
                <h1>A: Nomor pengaduan adalah nomor yang akan didapatkan user ketika user selesai mengirimkan laporan kejahatan. Nomor pengaduan berguna untuk mencari pengaduan yang user laporkan</h1>
            </div>
            <div className='bg-[#D9D9D9B2] text-3xl py-[21px] px-[22px] space-y-[19px]'>
                <h1>Q: Apakah semua pengaduan akan direspon?</h1>
                <h1>A: Pengaduan yang user laporkan akan direspon dan tercantum dalam website secara otomatis sesuai dengan respon dari pihak admin.</h1>
            </div>
        </div>
    </div>
  )
}
