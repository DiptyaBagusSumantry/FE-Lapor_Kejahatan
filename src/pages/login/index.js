import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Login() {
  return (
    <div className='bg-white w-full h-screen'>
        <h1 className="text-center text-black text-[58px] font-bold mt-[101px] mb-[124px]">Login as</h1>
        <div className='flex items-center justify-center gap-[239px]'>
            <Link href={"/login/pelapor"} className='w-[265px] h-[265px] bg-[#E2CEBD] px-[48px] py-[27px]'>
                <Image src={"/assets/images/logoLogin.png"} className='mb-[27px]' width={360} height={360}/>
                <h1 className="text-center text-black text-[37px] font-normal">Pelapor</h1>
            </Link>
            <Link href={"/login/admin"} className='w-[265px] h-[265px] bg-[#E2CEBD] px-[48px] py-[27px]'>
                <Image src={"/assets/images/logoLogin.png"} className='mb-[27px]' width={360} height={360}/>
                <h1 className="text-center text-black text-[37px] font-normal">Admin</h1>
            </Link>
        </div>
    </div>
  )
}
