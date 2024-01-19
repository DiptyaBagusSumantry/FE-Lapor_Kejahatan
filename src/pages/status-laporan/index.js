import React, { useEffect, useState } from 'react'
import api from '../api/hello'
import moment from 'moment'
import Modal from '@/components/Modal'
import toast from 'react-hot-toast'
import { data } from 'autoprefixer'

export default function StatusLaporan() {
    const [dataLaporan, setDataLaporan] = useState('')
    const [detailBalasan, setDetailBalasan] = useState('')
    const [statusLaporan, setStatusLaporan] = useState('')
    const [isModalBalasLaporan, setIsModalBalasLaporan] = useState(false)
    const [isOpenCekStatus, setIsOpenCekStatus] = useState('')
    const [dataTanpaLogin, setDataTanpaLogin] = useState('')
    const [nama, setNama] = useState('')
    const [email, setEmail] = useState('')
    const [noPengaduan, setNoPengaduan] = useState('')

    const getDataLaporan = async () => {
        try {
            const res = await api.GetLaporanKejahatanAdmin(localStorage.getItem('token'))
            console.log(res, 'responseDataaaaa')
            setDataLaporan(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const cekLaporanTanpaLogin = async () => {
        try {
            const data = {
                name: nama,
                email: email,
                nomer_pengaduan: noPengaduan
            }
            const res = await api.CetakLaporan(data)
            if(res.data.data === null){
                setDataTanpaLogin(null)
                toast.error('Tidak ada laporan atau nomor pengaduan tidak valid!')
            } else{
                setDataTanpaLogin(res.data.data)
            }
            console.log(res, 'response')
        } catch (error) {
            toast.error(error.response.msg)
        }
    }

    const openBalasanLaporan = async (id) => {
        setIsModalBalasLaporan(!isModalBalasLaporan)
        try {
            const res = await api.GetLaporanKejahatanById(localStorage.getItem('token'), id)
            setDetailBalasan(res.data.data)
            setStatusLaporan(res.data.data.status_laporans[0])
            console.log(res, 'dataById')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDataLaporan()
    }, [])
  return (
    <div>
        <Modal 
            activeModal={isModalBalasLaporan}
            buttonClose={ () => setIsModalBalasLaporan(!isModalBalasLaporan)}
            width={'863px'}
            content={
                <div className='space-y-[40px] w-full'> 
                    <div className="space-y-4 md:space-y-6">
                        <h1 className='text-start mb-3 text-black text-[40px] font-medium underline'>Preview Balasan Laporan</h1>
                        <div className='grid grid-cols-12 mb-10'>
                            <div className='col-span-2 text-black text-[18px] space-y-[33px]'>
                                <h1>Nama Pelapor</h1>
                                <h1>Nomor Pengaduan</h1>
                                <h1 className='pb-[119px]'>Feedback Laporan</h1>
                                <h1 className=''>Tanggapan</h1>
                            </div>
                            <div className='col-span-10 text-black text-[18px] space-y-[13px]'>
                                <input value={detailBalasan.name} type="text" placeholder='Nama...' className='py-[10px] px-[23px] w-full bg-white ' />
                                <input value={detailBalasan.nomer_pengaduan} type="text" placeholder='Nama...' className='py-[10px] px-[23px] w-full bg-white ' />
                                <textarea value={statusLaporan.status} name="" id="" rows="5" className='w-full resize-none px-[23px] py-[10px]' placeholder='Isi Laporan...'></textarea>
                                <textarea value={statusLaporan.tanggapan} name="" id="" rows="5" className='w-full resize-none px-[23px] py-[10px]' placeholder='Isi Tanggapan...'></textarea>
                            </div>
                        </div>
                        <div className='flex items-center justify-end gap-4 pb-4'>
                            <button onClick={() => setIsModalBalasLaporan(!isModalBalasLaporan)} className='border rounded-md bg-yellow-800 bg-opacity-90 text-white px-4 py-2 text-xl'>Close</button>
                        </div>
                    </div>
                </div>
            }
        />
        <Modal 
            activeModal={isOpenCekStatus}
            buttonClose={ () => setIsOpenCekStatus(!isOpenCekStatus)}
            width={'863px'}
            content={
                <div className='space-y-[40px] w-full'> 
                    <div className="space-y-4 md:space-y-6">
                        <h1 className='text-start mb-3 text-black text-[40px] font-medium underline'>Cek Laporan Kejahatan</h1>
                        <div className='grid grid-cols-12 mb-10'>
                            <div className='col-span-2 text-black text-[18px] space-y-[33px]'>
                                <h1>Nama Pelapor</h1>
                                <h1>Email</h1>
                                <h1>Nomor Pengaduan</h1>
                            </div>
                            <div className='col-span-10 text-black text-[18px] space-y-[13px]'>
                                <input onChange={(e) => setNama(e.target.value)} type="text" placeholder='Nama...' className='py-[10px] px-[23px] w-full bg-white ' />
                                <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email...' className='py-[10px] px-[23px] w-full bg-white ' />
                                <input onChange={(e) => setNoPengaduan(e.target.value)} type="number" placeholder='No Pengaduan...' className='py-[10px] px-[23px] w-full bg-white ' />
                            </div>
                        </div>
                        {dataTanpaLogin && (
                            <div className='p-4 border border-black rounded-md'>
                                <h1 className='text-xl text-center font-bold'>Detail Status Laporan</h1>
                                <div className='grid grid-cols-12 mt-10'>
                                    <div className='col-span-4 space-y-[13px] font-semibold'>
                                        <h1>Nama Pelapor: </h1>
                                        <h1>Email: </h1>
                                        <h1>No Pengaduan: </h1>
                                        <h1>Status: </h1>
                                        <h1>Jenis Kejahatan: </h1>
                                    </div>
                                    <div className='col-span-8 space-y-[13px] '>
                                        <h1>{dataTanpaLogin.name}</h1>
                                        <h1>{dataTanpaLogin.email}</h1>
                                        <h1>{dataTanpaLogin.nomer_pengaduan}</h1>
                                        <h1>{dataTanpaLogin.status}</h1>
                                        <h1>{dataTanpaLogin.kategori}</h1>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className='flex items-center justify-end gap-4 pb-4'>
                            <button onClick={cekLaporanTanpaLogin} className='border rounded-md bg-yellow-800 bg-opacity-90 text-white px-4 py-2 text-xl'>Cek</button>
                        </div>
                    </div>
                </div>
            }
        />
        <h1 className='text-center text-black text-[58px] mt-[40px] mb-[74px]'>Status Laporan</h1>
        <div className='bg-[#E2CEBD] h-screen mx-[61px] mb-[61px] pt-[48px] px-[30px]'>
            <div className='flex items-center justify-between mb-[59px]'>
                <div className='flex items-center gap-[18px] text-[26px]'>
                    <h1>Show</h1>
                    <select className='py-[10px] px-[15px] pr-[58px] appearance-none' name="" id="">
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                    <h1>Entries</h1>
                </div>
                <div className='flex gap-[23px] items-center text-[26px] '>
                    <h1>Search</h1>
                    <input type="text" placeholder='Search a keyword...' className='text-[18px] py-2 px-3 outline-none rounded-md shadow border' />
                </div>
            </div>
            <div>
                <div className='overflow-auto scrollbar-hide bg-white'>
                    <table className='w-full space-y-[10px] text-black border-black border-2'>
                        <div className='flex items-center gap-2  px-[14px] py-[8px] rounded-[3px] border-black border-b-2'>
                            <div className='gap-[6px] w-full flex items-center justify-center'>
                                <h1 className='text-black text-[18px] font-semibold '>Nama</h1>
                            </div>
                            <div className='gap-[6px] w-full flex items-center justify-center'>
                                <h1 className='text-black text-[18px] font-semibold '>Jenis Kejahatan</h1>
                            </div>
                            <div className='gap-[6px] w-full flex items-center justify-center'>
                                <h1 className='text-black text-[18px] font-semibold '>Tanggal</h1>
                            </div>
                            <div className='gap-[6px] w-full flex items-center justify-center'>
                                <h1 className='text-black text-[18px] font-semibold '>Balasan Laporan</h1>
                            </div>
                            <div className='gap-[6px] w-full flex items-center justify-center'>
                                <h1 className='text-black text-[18px] font-semibold '>Status</h1>
                            </div>
                        </div>
                        
                        {Object.values(dataLaporan).map((item, idx) => (
                            <div key={idx} className='flex items-center gap-2 px-[14px] py-[8px] rounded-[3px]'>
                                <div className='w-full flex items-center justify-center'>
                                    <h1 className='text-black text-[18px] font-[500] truncate'>{item.name}</h1>
                                </div>
                                <div className='w-full flex items-center justify-center'>
                                    <h1 className='text-black text-[18px] font-[500] truncate'>{item.kategori}</h1>
                                </div>
                                <div className='w-full flex items-center justify-center'>
                                    <h1 className='text-black text-[18px] font-[500] truncate'>{moment(item.createdAt).format('DD/MM/YYYY')}</h1>
                                </div>
                                <div className='w-full flex items-center justify-center'>
                                    <button onClick={() => openBalasanLaporan(item.id)} className='text-black text-[18px] font-[500] truncate underline'>Preview</button>
                                </div>
                                <div className='w-full flex items-center justify-center'>
                                    <h1 className={`text-white font-semibold text-[18px]  truncate ${item.status === 'Progress' ? 'bg-[#068006E5]' : item.status === 'InReview' ? 'bg-[#8B008BE5]' : item.status === "Done" ? 'bg-[#1E90FFE5]' : 'bg-[#EB1719E5]' } rounded-md px-4 py-2`}>{item.status}</h1>
                                </div>
                            </div>
                        ))}
                    </table>
                </div>
                {!dataLaporan && (
                    <div className='mt-10'>
                        <h1>Anda belum login kedalam sistem, silahkan login terlebih dahulu atau <span><button onClick={() => setIsOpenCekStatus(!isOpenCekStatus)} className='underline font-semibold'>Cek status tanpa login</button></span></h1>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}
