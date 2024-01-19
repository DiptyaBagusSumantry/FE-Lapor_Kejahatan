import React from 'react'

export default function BantuanPage() {
  return (
    <div className='pb-[71px]'>
        <h1 className='text-center text-[58px] mt-[40px] mb-[33px] '>Bantuan</h1>
        <div className="mx-[61px] text-black text-opacity-60 text-3xl font-normal">
            <h1 className=''>Anda dapat melaporkan pengaduan dengan cara: </h1>
            <div className='bg-[#E2CEBD] px-[71px] py-[27px] grid grid-cols-12 text-black'>
                <div className='col-span-1'>
                    <h1>1.</h1>
                    <h1>2.</h1>
                    <h1>3.</h1>
                    <h1>4.</h1>
                    <h1>5.</h1>
                    <h1>6.</h1>
                </div>
                <div className='col-span-11'>
                    <h1>Klik menu “Lapor Kejahatan” untuk melaporkan kejahatan yang terjadi.</h1>
                    <h1>Isi form “Laporan Kejahatan” sesuai dengan informasi yang diketahui.</h1>
                    <h1>Pastikan semua kontak dan alamat terisi dengan benar dan dapat dihubungi.</h1>
                    <h1>Ketika sudah selesai, klik “Kirim” untuk mengirimkan laporan.</h1>
                    <h1>Catat dan simpan dengan baik “Nomor Pengaduan” untuk mengetahui status tindak lanjut pengaduan.</h1>
                    <h1>Admin akan menghubungi pelapor melalui kontak yang telah dicantumkan pelapor.</h1>
                </div>
            </div>
        </div>
        <div className="mx-[61px] text-black text-opacity-60 text-3xl font-normal mt-[75px]">
            <h1 className=''>Anda dapat melaporkan pengaduan dengan cara: </h1>
            <div className='bg-[#E2CEBD] px-[71px] py-[27px] grid grid-cols-12 text-black'>
                <div className='col-span-1'>
                    <h1>1.</h1>
                    <h1>2.</h1>
                    <h1>3.</h1>
                </div>
                <div className='col-span-11'>
                    <h1>Klik menu “Status Laporan” untuk melihat status tindak lanjut pengaduan.</h1>
                    <h1>Masukan “Nomor Pengaduan” yang sudah didapat dari pengisian form “Laporan Kejahatan” di search bar, lalu ENTER.</h1>
                    <h1>Status laporan akan terlihat dengan lengkap.</h1>
                </div>
            </div>
        </div>
    </div>
  )
}
