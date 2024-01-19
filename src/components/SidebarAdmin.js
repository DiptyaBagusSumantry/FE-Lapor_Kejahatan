import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export default function SidebarAdmin() {
    const route = useRouter()
  return (
    <div>
        <div className='bg-[#E2CEBD] w-[400px] h-full'>
            <div className='mb-6'>
                <div className='flex items-center justify-center'>
                    <img className='mt-3' src="https://i.pravatar.cc/212" alt="" />
                </div>
                <h1 className="text-black text-[35px] text-center">Admin</h1>
                <div className='w-full h-4 bg-[#D0A074]'></div>
            </div>
            <div className='space-y-[40px]'>
                <div className={`${route.pathname === '/admin/dashboard' ? 'bg-[#3C2621BF] h-[77px] w-full flex items-center text-white' : ''}`}>
                    <Link href={'/admin/dashboard'} className={`text-2xl px-[40px] text-start`}>Dashboard</Link>
                </div>
                <div className={`${route.pathname === '/admin/daftar-kejahatan' ? 'bg-[#3C2621BF] h-[77px] w-full flex items-center justify-start text-white' : '' }`}>
                    <Link href={'/admin/daftar-kejahatan'} className={`text-2xl px-[40px] text-start`}>Daftar Kejahatan</Link>
                </div>
                {/* <div className={`${route.pathname === '/admin/peta-lokasi-kejahatan' ? 'bg-[#3C2621BF] h-[77px] w-full flex items-center justify-start text-white' : '' }`}>
                    <Link href={'/admin/peta-lokasi-kejahatan'} className={`text-2xl px-[40px] text-start`}>Peta Lokasi Kejahatan</Link>
                </div> */}
                <div className={`${route.pathname === '/admin/berita-info-terkini' ? 'bg-[#3C2621BF] h-[77px] w-full flex items-center text-white' : ''}`}>
                    <Link href={'/admin/berita-info-terkini'} className={`text-2xl px-[40px] text-start`}>Berita Info Terkini</Link>
                </div>
            </div>
        </div>
    </div>
  )
}
