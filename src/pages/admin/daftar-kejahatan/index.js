import React, { use, useEffect, useState } from 'react'
import Modal from '@/components/Modal';
import api from '@/pages/api/hello';
import moment from 'moment';
import toast from 'react-hot-toast';
import imageHandle from '@/pages/utils/handleImage';

export default function DaftarKejahatan() {

    const [isModalEdit, setIsModalEdit] = useState(false)
    const [isModalBalasLaporan, setIsModalBalasLaporan] = useState(false)
    const [isModalDeleteLaporan, setIsModalDeleteLaporan] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [alamat, setAlamat] = useState('')
    const [telepon, setTelepon] = useState('')
    const [jenisKejahatan, setJenisKejahatan] = useState('')
    const [isiLaporan, setIsiLaporan] = useState('')
    const [buktiKejahatan, setBuktiKejahatan] = useState('')
    const [status, setStatus] = useState('')

    const [namaPelapor, setNamaPelapor] = useState('')
    const [isiLaporanBalas, setIsiLaporanBalas] = useState('')
    const [tanggapan, setTanggapan] = useState('')
    const [idLaporan, setIdLaporan] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [dataLaporanKejahatan, setDataLaporanKejahatan] = useState('')
    const [detailData, setDetailData] = useState('')

    const getDaftarKejahatan = async () => {
        try {
            const res = await api.GetLaporanKejahatanAdmin(localStorage.getItem('token'))
            console.log(res)
            setDataLaporanKejahatan(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const openEditLaporan = async (id) => {
        setIdLaporan(id)
        setIsModalEdit(!isModalEdit)
        try {
            const res = await api.GetLaporanKejahatanById(localStorage.getItem('token'), id)
            console.log(res, 'resById')
            setDetailData(res.data.data)
            setStatus(res.data.data.status)
        } catch (error) {
            console.log(error)
        }
    }

    const updateStatusLaporan = async () => {
        try {
            const data ={
                name: detailData.name,
                email: detailData.email,
                phone: detailData.phone,
                kategori: detailData.kategori,
                deskripsi: detailData.deskripsi,
                status: status,
                desaKecamataId: detailData.desaKecamatanId,
                image: ''
            }
            const res = await api.UpdateLaporanKejahatan(localStorage.getItem('token'), data, idLaporan)
            console.log(res, 'resCreate')
            toast.success('Sukses Update Status Laporan!')
            setRefresh(true)
            setIsModalEdit(!isModalEdit)
        } catch (error) {
            console.log(error)
        }
    }

    const openBalasLaporan = async (id) => {
        setIsModalBalasLaporan(!isModalBalasLaporan)
        try {
            const res = await api.GetLaporanKejahatanById(localStorage.getItem('token'), id)
            setIdLaporan(res.data.data.status_laporans[0].id)
            console.log(res, 'responseId')
        } catch (error) {
            console.log(error)
        }
    }

    const balasLaporan = async () => {
        try {
            const data ={
                status : isiLaporanBalas,
                tanggapan : tanggapan,
                laporanId: idLaporan
            }
            const res = await api.CreateBalasLaporan(localStorage.getItem('token'), data, idLaporan)
            toast.success('Berhasil Membalas Laporan!')
            setIsModalBalasLaporan(!isModalBalasLaporan)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteLaporan = async (id) => {
        try {
            const res = await api.DeleteLaporanKejahatan(localStorage.getItem('token'), id)
            toast.success('Success Delete Laporan!')
            setRefresh(true)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDaftarKejahatan()
        setRefresh(false)
    }, [refresh])

  return (
    <div className='px-[29px] w-full'>
        <Modal 
            activeModal={isModalEdit}
            buttonClose={ () => setIsModalEdit(!isModalEdit)}
            width={'971px'}
            content={
                <div className='space-y-[40px] w-full'> 
                    <div className="space-y-4 md:space-y-6">
                        <h1 className='text-start mb-3 text-black text-[40px] font-medium underline'>Detail Laporan</h1>
                        <div className='grid grid-cols-12 mb-10'>
                            <div className='col-span-2 text-black text-[18px] space-y-[33px]'>
                                <h1>Nama</h1>
                                <h1>Email</h1>
                                <h1>Alamat</h1>
                                <h1>Telepon</h1>
                                <h1>Jenis Kejahatan</h1>
                                <h1 className='pb-[145px]'>Isi Laporan</h1>
                                <h1>Bukti Kejahatan</h1>
                                <h1>Status</h1>
                            </div>
                            <div className='col-span-10 text-black text-[18px] space-y-[13px]'>
                                <input onChange={(e) => setName(e.target.value)} value={detailData.name} type="text" placeholder='Nama...' className='py-[10px] px-[23px] w-full bg-white ' />
                                <input onChange={(e) => setEmail(e.target.value)} value={detailData.email} type="email" placeholder='Email...' className='py-[10px] px-[23px] w-full bg-white ' />
                                <input onChange={(e) => setAlamat(e.target.value)} value={detailData.desaKecamatanId} type="text" placeholder='Alamat...' className='py-[10px] px-[23px] w-full bg-white ' />
                                <input onChange={(e) => setTelepon(e.target.value)} value={detailData.phone} type="number" placeholder='Telepon...' className='py-[10px] px-[23px] w-full bg-white ' />
                                <select onChange={(e) => setJenisKejahatan(e.target.value)} value={detailData.kategori} className='w-full bg-white py-[10px] px-[23px]'>
                                    <option value="Jenis Kejahatan">Pilih Jenis Kejahatan</option>
                                    <option value="pencurian">Pencurian</option>
                                    <option value="Kejahatan Seksual">Kejahatan Seksual</option>
                                    <option value="Pembullyan">Pembullyan</option>
                                    <option value="Penganiayaan">Penganiayaan</option>
                                    <option value="Penipuan">Penipuan</option>
                                    <option value="Narkoba">Narkoba</option>
                                </select>
                                <textarea  onChange={(e) => setIsiLaporan(e.target.value)} value={detailData.deskripsi} name="" id="" rows="5" className='w-full resize-none px-[23px] py-[10px]' placeholder='Isi Laporan...'></textarea>
                                {detailData.image !== "no image" && (
                                    <div className='w-full flex items-center     justify-start'>
                                        <img src={!detailData.image ? "/assets/images/dashboard.jpeg" : imageHandle(detailData.image[0])} className='w-[300px] h-[300px] object-cover rounded-[8px] border shadow-lg' alt='Bukti Kejahatan'/>
                                    </div>
                                )}
                                {detailData.image === "no image" && (
                                    <div className='pt-9'>
                                        <h1>Tidak ada bukti yang di upload</h1>
                                    </div>
                                )}
                                <select onChange={(e) => setStatus(e.target.value)} value={status}  name="" id="" className='w-full bg-white py-[10px] px-[23px]'>
                                    <option value="">Status</option>
                                    <option value="Progress">Progress</option>
                                    <option value="InReview">In Review</option>
                                    <option value="Done">Done</option>
                                    <option value="Declined">Declined</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex items-center justify-end gap-4 pb-4'>
                            <button onClick={() => setIsModalEdit(!isModalEdit)} className='border rounded-md bg-yellow-800 bg-opacity-90 text-white px-4 py-2 text-xl'>Cancel</button>
                            <button onClick={updateStatusLaporan} className='border rounded-md bg-yellow-800 bg-opacity-90 text-white px-4 py-2 text-xl'>Save</button>
                        </div>
                    </div>
                </div>
            }
        />
        <Modal 
            activeModal={isModalBalasLaporan}
            buttonClose={ () => setIsModalBalasLaporan(!isModalBalasLaporan)}
            width={'863px'}
            content={
                <div className='space-y-[40px] w-full'> 
                    <div className="space-y-4 md:space-y-6">
                        <h1 className='text-start mb-3 text-black text-[40px] font-medium underline'>Balas Laporan</h1>
                        <div className='grid grid-cols-12 mb-10'>
                            <div className='col-span-2 text-black text-[18px] space-y-[33px]'>
                                <h1 className='pb-[119px]'>Feedback Laporan</h1>
                                <h1 className=''>Tanggapan</h1>
                            </div>
                            <div className='col-span-10 text-black text-[18px] space-y-[13px]'>
                                <textarea onChange={(e) => setIsiLaporanBalas(e.target.value)} name="" id="" rows="5" className='w-full resize-none px-[23px] py-[10px]' placeholder='Kirim Feedback Laporan...'></textarea>
                                <textarea onChange={(e) => setTanggapan(e.target.value)} name="" id="" rows="5" className='w-full resize-none px-[23px] py-[10px]' placeholder='Isi Tanggapan...'></textarea>
                            </div>
                        </div>
                        <div className='flex items-center justify-end gap-4 pb-4'>
                            <button onClick={() => setIsModalBalasLaporan(!isModalBalasLaporan)} className='border rounded-md bg-yellow-800 bg-opacity-90 text-white px-4 py-2 text-xl'>Cancel</button>
                            <button onClick={balasLaporan} className='border rounded-md bg-yellow-800 bg-opacity-90 text-white px-4 py-2 text-xl'>Save</button>
                        </div>
                    </div>
                </div>
            }
        />
        <h1 className='text-center text-black text-[58px] mt-[40px] mb-[74px]'>Daftar Kejahatan</h1>
        <div className='bg-[#E2CEBD] h-screen mb-[61px] pt-[48px] px-[30px]'>
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
                <div className='overflow-auto scrollbar-hide'>
                    <table className='w-full bg-white space-y-[10px] text-black border-black border-2'>
                        <div className='flex items-center gap-2  px-[14px] py-[8px] rounded-[3px] border-black border-b-2'>
                            <div className='flex items-center gap-[6px] w-full'>
                                <h1 className='text-black text-[18px] font-semibold '>Nama</h1>
                            </div>
                            <div className='flex items-center gap-[6px] w-full'>
                                <h1 className='text-black text-[18px] font-semibold '>Jenis Kejahatan</h1>
                            </div>
                            <div className='flex items-center gap-[6px] w-full'>
                                <h1 className='text-black text-[18px] font-semibold '>Tanggal</h1>
                            </div>
                            <div className='flex items-center gap-[6px] w-full'>
                                <h1 className='text-black text-[18px] font-semibold '>Status</h1>
                            </div>
                            
                            <div className='flex items-center justify-center gap-[6px] w-full'>
                                <h1 className='text-black text-[18px] font-semibold'>Aksi</h1>
                            </div>
                        </div>
                        {Object.values(dataLaporanKejahatan).map((data , index) => (
                            <div  className='flex items-center gap-2 px-[14px] py-[8px] rounded-[3px]'>
                                <div className='w-full'>
                                    <h1 className='text-black text-[18px] font-[500] truncate'>{data.name}</h1>
                                </div>
                                <div className='w-full'>
                                    <h1 className='text-black text-[18px] font-[500] truncate'>{data.kategori}</h1>
                                </div>
                                <div className='w-full'>
                                    <h1 className='text-black text-[18px] font-[500] truncate'>{moment(data.createdAt).format('DD/MM/YYYY')}</h1>
                                </div>
                                <div className='w-full'>
                                    <h1 className='text-black text-[18px] font-[500] truncate'>{data.status}</h1>
                                </div>
                                <div className='w-full flex items-center justify-center gap-[12px]'>
                                    <button onClick={() => openEditLaporan(data.id)} className='w-[29px] h-[29px] rounded-[9px] flex items-center justify-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
                                            <path d="M22.75 10H3.25" stroke="#545454" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M22.75 6H3.25" stroke="#545454" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M22.75 14H3.25" stroke="#545454" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M22.75 18H3.25" stroke="#545454" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                    <button onClick={() => openBalasLaporan(data.id)} className='w-[29px] h-[29px] rounded-[9px] flex items-center justify-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M19 13C19 13.5304 18.7893 14.0391 18.4142 14.4142C18.0391 14.7893 17.5304 15 17 15H5L1 19V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H17C17.5304 1 18.0391 1.21071 18.4142 1.58579C18.7893 1.96086 19 2.46957 19 3V13Z" stroke="#545454" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                    <button onClick={() => deleteLaporan(data.id)} className='w-[29px] h-[29px] rounded-[9px] flex items-center justify-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M3 6H5H21" stroke="#545454" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="#545454" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M10 11V17" stroke="#545454" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M14 11V17" stroke="#545454" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}
