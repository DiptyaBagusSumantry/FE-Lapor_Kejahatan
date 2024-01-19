import Modal from '@/components/Modal'
import api from '@/pages/api/hello'
import imageHandle from '@/pages/utils/handleImage'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { HiDotsVertical } from 'react-icons/hi'

export default function BeritaInfoTerkini() {
    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
    const [isOpenOption, setIsOpenOption] = useState(false)

    const [judul, setJudul] = useState('')
    const [tanggal, setTanggal] = useState('')
    const [isiBerita, setIsiBerita] = useState('')
    const [gambar, setGambar] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [dataBerita, setDataBerita] = useState('')
    const [idBerita, setIdBerita] = useState('')
    const [viewImage, setViewImage] = useState('')


    const handleViewImage = (e) => {
        const maxSize = 2 * 1024 * 1024
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const file = e.target.files[0]
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (file && file.size > maxSize){
            toast.error('gambar harus < 2MB')
            setGambar(null)
        } else if (!allowedExtensions.includes(fileExtension)){
            toast.error('file harus jpg, jpeg, atau png')
        } else {
            setViewImage(URL.createObjectURL(e.target.files[0]))
            const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                setGambar(reader.result)
            };
        }
    }

    const createBerita = async () => {
        try {
            const data ={
                title: judul,
                deskripsi: isiBerita,
                image: gambar,
                date : tanggal
            }
            const res = await api.CreateBerita(localStorage.getItem('token'), data)
            toast.success('Sukses Create Berita!')
            setRefresh(true)
            setIsOpenAddModal(!isOpenAddModal)
        } catch (error) {
            console.log(error)
        }
    }

    const openEditBerita = async (id) => {
        setIdBerita(id)
        setIsOpenEditModal(!isOpenEditModal)
        try {
            const res = await api.GetBeritaById(localStorage.getItem('token'), id)
            console.log(res, 'resId')
            setJudul(res.data.data.title)
            setIsiBerita(res.data.data.deskripsi)
            setTanggal(res.data.data.date)
        } catch (error) {
            console.log(error)
        }
    }

    const editBerita = async () => {
        try {
            const data ={
                title: judul,
                deskripsi: isiBerita,
                image: gambar,
                date : tanggal
            }
            const res = await api.UpdateBerita(localStorage.getItem('token'), data, idBerita)
            toast.success('Sukses Mengubah Data!')
            setRefresh(true)
            setIsOpenEditModal(!isOpenEditModal)
        } catch (error) {
            console.log(error)
        }
    }

    const getBerita = async () => {
        try {
            const res = await api.GetBerita(localStorage.getItem('token'))
            setDataBerita(res.data.data)
            console.log(res, 'resData')
        } catch (error) {
            console.log(error)
        }
    }

    const deleteBerita = async (id) => {
        try {
            const res = await api.DeleteBerita(localStorage.getItem('token'), id)
            toast.success('Success Delete Berita!')
            setRefresh(true)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBerita()
        setRefresh(false)
    }, [refresh])

    return (
        <div className='w-full'>
            <Modal 
                activeModal={isOpenEditModal}
                buttonClose={ () => setIsOpenEditModal(!isOpenEditModal)}
                width={'971px'}
                content={
                    <div className='space-y-[40px] w-full'> 
                        <div className="space-y-4 md:space-y-6">
                            <h1 className='text-start mb-3 text-black text-[40px] font-medium underline'>Edit Berita</h1>
                            <div className='grid grid-cols-12 mb-10'>
                                <div className='col-span-2 text-black text-[18px] space-y-[33px]'>
                                    <h1>Judul Berita</h1>
                                    <h1>Tanggal</h1>
                                    <h1 className='pb-[145px]'>Isi Berita</h1>
                                    <h1>Gambar</h1>
                                </div>
                                <div className='col-span-10 text-black text-[18px] space-y-[13px]'>
                                    <input onChange={(e) => setJudul(e.target.value)} value={judul} type="text" placeholder='Judul Berita...' className='py-[10px] px-[23px] w-full bg-white ' />
                                    <input onChange={(e) => setTanggal(e.target.value)} value={tanggal} type="date" placeholder='Judul Berita...' className='py-[10px] px-[23px] w-full bg-white ' />
                                    <textarea onChange={(e) => setIsiBerita(e.target.value)} value={isiBerita} name="" id="" rows="5" className='w-full resize-none px-[23px] py-[10px]' placeholder='Isi Laporan...'></textarea>
                                    <div>
                                        <label htmlFor='upload-image'>
                                            <div className='w-full lg:w-[404px] h-[267px] rounded-[3px] bg-[#D9D9D9] bg-cover shadow-md border' style={{ backgroundImage: `url(${viewImage})` }}>
                                                {!viewImage &&
                                                    <div className='flex flex-col justify-center items-center space-y-3 h-full'>
                                                        <img src={' '} alt='Insert Humanusia'/>
                                                        <h1 className='text-[#A8A8A8] text-[8px] w-1/2 text-center'>*Acceptable file types are JPG, JPEG and PNG. Max file size is 2 MB.</h1>
                                                    </div>
                                                }
                                            </div>
                                            <input type='file' className='hidden' id='upload-image' onChange={ (e) => handleViewImage(e) }/>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-end gap-4 pb-4'>
                                <button onClick={() => setIsOpenEditModal(!isOpenEditModal)} className='border rounded-md bg-yellow-800 bg-opacity-90 text-white px-4 py-2 text-xl'>Cancel</button>
                                <button onClick={editBerita} className='border rounded-md bg-yellow-800 bg-opacity-90 text-white px-4 py-2 text-xl'>Save</button>
                            </div>
                        </div>
                    </div>
                }
            />
            <Modal 
                activeModal={isOpenAddModal}
                buttonClose={ () => setIsOpenAddModal(!isOpenAddModal)}
                width={'971px'}
                content={
                    <div className='space-y-[40px] w-full'> 
                        <div className="space-y-4 md:space-y-6">
                            <h1 className='text-start mb-3 text-black text-[40px] font-medium underline'>Tambah Berita</h1>
                            <div className='grid grid-cols-12 mb-10'>
                                <div className='col-span-2 text-black text-[18px] space-y-[33px]'>
                                    <h1>Judul Berita</h1>
                                    <h1>Tanggal</h1>
                                    <h1 className='pb-[145px]'>Isi Berita</h1>
                                    <h1>Gambar</h1>
                                </div>
                                <div className='col-span-10 text-black text-[18px] space-y-[13px]'>
                                    <input onChange={(e) => setJudul(e.target.value)} type="text" placeholder='Judul...' className='py-[10px] px-[23px] w-full bg-white ' />
                                    <input type="date" onChange={(e) => setTanggal(e.target.value)}  className='py-[10px] px-[23px] w-full bg-white ' />
                                    <textarea onChange={(e) => setIsiBerita(e.target.value)} name="" id="" rows="5" className='w-full resize-none px-[23px] py-[10px]' placeholder='Isi Laporan...'></textarea>
                                    <div>
                                        <label htmlFor='upload-image'>
                                            <div className='w-full lg:w-[404px] h-[267px] rounded-[3px] bg-[#D9D9D9] bg-cover shadow-md border' style={{ backgroundImage: `url(${viewImage})` }}>
                                                {!viewImage &&
                                                    <div className='flex flex-col justify-center items-center space-y-3 h-full'>
                                                        <img src={' '} alt='Insert Humanusia'/>
                                                        <h1 className='text-[#A8A8A8] text-[8px] w-1/2 text-center'>*Acceptable file types are JPG, JPEG and PNG. Max file size is 2 MB.</h1>
                                                    </div>
                                                }
                                            </div>
                                            <input type='file' className='hidden' id='upload-image' onChange={ (e) => handleViewImage(e) }/>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-end gap-4 pb-4'>
                                <button onClick={() => setIsOpenAddModal(!isOpenAddModal)} className='border rounded-md bg-yellow-800 bg-opacity-90 text-white px-4 py-2 text-xl'>Cancel</button>
                                <button onClick={createBerita} className='border rounded-md bg-yellow-800 bg-opacity-90 text-white px-4 py-2 text-xl'>Save</button>
                            </div>
                        </div>
                    </div>
                }
            />
            <div className='px-[46px] py-[48px]'>
                <h1 className='text-center text-black text-[58px] mt-[40px] mb-[74px]'>Berita Info Terkini</h1>
                
                <div className='flex items-center justify-between gap-5'>
                    <div className='flex items-center justify-center w-full'>
                        <div className='rounded-lg border px-4 py-2 w-full'>
                            <input type="text" className='w-full outline-none text-lg' placeholder='Search...' />
                        </div>
                    </div>
                    <button onClick={() => setIsOpenAddModal(!isOpenAddModal)} className='px-4 py-2 text-lg font-semibold my-[31px] bg-[#8A553EE5] rounded-md text-white'>Tambah Berita</button>
                </div>
                <div className='bg-[#E2CEBD] h-fit w-full py-[32px] px-[20px] grid grid-cols-3 items-center justify-center gap-3'>
                    {Object.values(dataBerita).map((item, idx) => (
                        <div className='border-4 bg-white rounded-2xl w-[300px] h-[450px] px-[20px] py-[29px] space-y-2'>
                            <div className='flex items-center justify-end relative'>
                                <button onClick={() => setIsOpenOption(idx)}>
                                    <HiDotsVertical className='text-lg'/>
                                </button>
                                {isOpenOption === idx &&
                                (
                                    <>
                                        <div className='absolute bg-[#FFEFE0] px-3 py-1 space-y-3 text-sm border top-5 right-0 w-'>
                                            <button onClick={() => openEditBerita(item.id)} className='flex items-center justify-center gap-3'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
                                                    <path d="M22.75 10H3.25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M22.75 6H3.25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M22.75 14H3.25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M22.75 18H3.25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                                <h1 className='font-medium'>Edit</h1><br />
                                            </button>
                                            <div onClick={() => deleteBerita(item.id)} className='flex items-center justify-center gap-3'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M3 6H5H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M10 11V17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M14 11V17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                                <button className='font-medium'>Delete</button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className='flex items-center justify-center '>
                                <img className='object-fit' src={item.image? imageHandle(item.image) : "/assets/images/dashboard.jpeg"} alt="image" />
                            </div>
                            <h1 className='font-semibold text-center text-lg' >{item.title}</h1>
                            <h1 className='text-sm '>{item.deskripsi}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
