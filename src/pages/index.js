import Image from 'next/image'

export default function Home() {
  return (
    <div className=''>
      <div className='relative w-full'>
        <div className='absolute -z-10 w-full'>
          <Image src={"/assets/images/dashboard.jpeg"} className='w-full' width={1440} height={1024}/>
        </div>
        <div className='flex items-center justify-center my-auto pt-[318px]'>
          <div>
            <h1 className="text-white text-center text-[58px] font-bold mb-[25px]">Selamat Datang</h1>
            <h1 className="text-white text-center text-4xl font-normal">Website Lapor Kejahatan Banyumas</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
