import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username harus diisi'),
  password: Yup.string().required('Password harus diisi'),
});

export default function LoginPelapor() {

  const router = useRouter()


  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/login', values);
      localStorage.setItem('token', response.data.accessToken)
      router.push('/status-laporan');
      toast.success('Success Login!');
    } catch (error) {
      console.log(error)
      if (error.response.status === 401) {
        toast.error('Invalid username or password')
      } else {
        toast.error('Failed Login!')
      }
    }
  };

  return (
    <div className='pb-[228px]'>
      <div className="w-[732px] h-fit bg-[#E2CEBD] border-4 border-black m-auto mt-[84px] pt-[32px] pb-[52px] px-[38px]">
        <h1 className="text-center text-black text-[58px] font-normal mb-[32px]">Login as Pelapor</h1>
        <div>
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className='mb-[34px]'>
                <h1 className="text-black text-[35px] font-normal mb-[16px]">Username</h1>
                <Field type="text" name="username" className="rounded-[25px] py-[18px] px-[23px] w-full text-[25px]" placeHolder="Enter Username"/> 
                <ErrorMessage name="username" component="div" className="text-red-500 text-lg pl-3" />
              </div>

              <div className='mb-[34px]'>
                <h1 className="text-black text-[35px] font-normal mb-[16px]">Password</h1>
                <Field type="password" name="password" className="rounded-[25px] py-[18px] px-[23px] w-full text-[25px]" placeHolder="Enter Password"/>
                <ErrorMessage name="password" component="div" className="text-red-500 text-lg pl-3" />
              </div>

              <div className='flex items-center justify-center'>
                <button className='w-full py-[13px] bg-stone-800 rounded-[25px] text-white text-[35px] mb-[32px]' type="submit">Login</button>
              </div>

              <div className='flex items-center justify-center gap-[12px]'>
                <h1 className="text-black text-opacity-50 text-xl font-normal">Don’t have an account?</h1>
                <Link href={"/register"} className="text-blue-400 text-xl font-bold">Create here</Link>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}
