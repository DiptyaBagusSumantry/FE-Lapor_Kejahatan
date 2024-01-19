import React, { useEffect, useState } from 'react'
import api from '../api/hello'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

export default function index() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [alamat, setAlamat] = useState('')
  const [telepon, setTelepon] = useState('')
  const [jenisKejahatan, setJenisKejahatan] = useState('')
  const [isiLaporan, setIsiLaporan] = useState('')
  const [buktiKejahatan, setBuktiKejahatan] = useState('')
  const [status, setStatus] = useState('')
  const route = useRouter()
  const [viewImage, setViewImage] = useState('')

  const [dataJenisKejahatan, setDataJenisKejahatan] = useState('')

  const getJenisKejahatan = async () => {
    try {
      const res = await api.GetJenisKejahatan(localStorage.getItem('token'))
      setDataJenisKejahatan(res.data.data)
      console.log(res, 'response jenis kejahatan')
    } catch (error) {
      console.log(error)
    }
  }

  const handleViewImage = (e) => {
    const maxSize = 2 * 1024 * 1024
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const file = e.target.files[0]
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (file && file.size > maxSize){
        toast.error('gambar harus < 2MB')
        setBuktiKejahatan(null)
    } else if (!allowedExtensions.includes(fileExtension)){
        toast.error('file harus jpg, jpeg, atau png')
    } else {
        setViewImage(URL.createObjectURL(e.target.files[0]))
        const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
            setBuktiKejahatan(reader.result)
        };
    }
  }

  const createLaporan = async () => {
    try {
      const data = {
        name: name,
        email: email,
        phone: telepon,
        kategori: jenisKejahatan,
        deskripsi: isiLaporan,
        desaKecamatanId: "005675b0-98d8-4d66-b954-ecf465367d17",
        image: [buktiKejahatan],
      };
      console.log(data, 'sendedData')
      const res = await api.CreateLaporan(localStorage.getItem('token'), data)
      toast.success('Success Create Laporan!')
      route.push('/status-laporan')
    } catch (error) {
      toast.error('Anda belum login atau data anda tidak valid!')
      console.log(error)
    }
  }

  useEffect(() => {
    getJenisKejahatan()
  }, [])
  return (
    <div>
        <h1 className="text-center text-black text-[58px] font-normal my-[57px]">Laporan Kejahatan</h1>
        <div className='px-[62px] py-[30px]'>
              <div className='w-full h-fit bg-[#E2CEBD] py-[20px] shadow border'>
                  <div className='grid grid-cols-12 py-[60px] px-[62px]'>
                    <div className='col-span-2 text-black text-[18px] space-y-[33px]'>
                      <h1>Nama</h1>
                      <h1>Email</h1>
                      <h1>Alamat</h1>
                      <h1>Telepon</h1>
                      <h1>Jenis Kejahatan</h1>
                      <h1 className='pb-[114px]'>Isi Laporan</h1>
                      <h1>Bukti Kejahatan</h1>
                    </div>
                    <div className='col-span-10 text-black text-[18px] space-y-[13px]'>
                      <input onChange={(e) => setName(e.target.value)} type="text" placeholder='Nama...' className='py-[10px] px-[23px] w-full bg-white ' />
                      <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Email...' className='py-[10px] px-[23px] w-full bg-white ' />
                      <input onChange={(e) => setAlamat(e.target.value)} type="text" placeholder='Alamat...' className='py-[10px] px-[23px] w-full bg-white ' />
                      <input onChange={(e) => setTelepon(e.target.value)} type="text" placeholder='Telepon...' className='py-[10px] px-[23px] w-full bg-white ' />
                      <select onChange={(e) => setJenisKejahatan(e.target.value)} name="" id="" className='w-full bg-white py-[10px] px-[23px]'>
                        <option value="">Pilih Jenis Kejahatan</option>
                        {Object.values(dataJenisKejahatan).map((item, idx) => (
                          <option value={item.kategori}>{item.kategori}</option>
                        ))}
                      </select>
                      <textarea onChange={(e) => setIsiLaporan(e.target.value)} name="" id="" rows="5" className='w-full resize-none px-[23px] py-[10px]' placeholder='Isi Laporan...'></textarea>
                      <div>
                            <label htmlFor='upload-image'>
                                <div className='w-full lg:w-[404px] h-[267px] rounded-[3px] bg-white bg-cover shadow-md border' style={{ backgroundImage: `url(${viewImage})` }}>
                                    {!viewImage &&
                                        <div className='flex flex-col justify-center items-center space-y-3 h-full'>
                                            <img src={"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fid%2Fpng-bmepu&psig=AOvVaw2a8fN9wMXdvYqylEGll07C&ust=1705457083958000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKCk0u_o4IMDFQAAAAAdAAAAABAD"} alt='Insert Foto'/>
                                            <h1 className='text-[#A8A8A8] text-[8px] w-1/2 text-center'>*Acceptable file types are JPG, JPEG and PNG. Max file size is 2 MB.</h1>
                                        </div>
                                    }
                                </div>
                                <input type='file' className='hidden' id='upload-image' onChange={ (e) => handleViewImage(e) }/>
                            </label>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-end pr-20'>
                  <button onClick={createLaporan} className='text-[18px] text-white bg-[#8A553EE5] py-[13px] px-[29px]'>Kirim</button>
                </div>
              </div>
            
        </div>
    </div>
  )
}
