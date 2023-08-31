'use client'
import { FormDataLogin, loginSchema } from '@/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { isAxiosUnprocessableEntity } from '@/utils/utils'
import { ErrorResponse } from '@/types/utils.type'
import { authApi } from '@/apis/home.api'
import Input from '@/components/Input/Input'
import Button from '@/components/Button/Button'
import { AppContext } from '@/contexts/app.context'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Login() {
   const { currentSongId, setIsAuthenticated, setProfile, isAuthenticated } = useContext(AppContext)
   const router = useRouter()
   const {
      handleSubmit,
      register,
      setError,
      formState: { errors }
   } = useForm<FormDataLogin>({
      mode: 'onSubmit',
      resolver: yupResolver(loginSchema)
   })

   const loginMutation = useMutation({
      mutationFn: authApi.login
   })
   const handleLogin = handleSubmit((data) => {
      //data này là từ cái form nhập vào(email, password)
      loginMutation.mutate(data, {
         //đây là cái data chứa thông tin người dùng trả về khi đăng ký thành công
         onSuccess: (data) => {
            setIsAuthenticated(true)
            setProfile(data.data.data.user)
            toast.success('Đăng nhập thành công')
         },
         onError: (error) => {
            //nếu có lỗi trả về từ axios thì sẽ lấy ra message lỗi từ axios gắn vào setError của react-hook-form để hiển thị ra ngoài input
            if (isAxiosUnprocessableEntity<ErrorResponse<FormDataLogin>>(error)) {
               //lấy ra cái lỗi
               const formError = error.response?.data.data
               if (formError) {
                  Object.keys(formError).forEach((key) => {
                     if (formError[key as keyof FormDataLogin]) {
                        setError(key as keyof FormDataLogin, {
                           message: formError[key as keyof FormDataLogin],
                           type: 'Server'
                        })
                     }
                  })
               }
            }
         }
      })
   })

   useEffect(() => {
      if (isAuthenticated) {
         router.push('/mymusic/song')
      }
   }, [isAuthenticated, router])

   return (
      <div className={`mt-[70px] text-center px-14 ${currentSongId ? 'pb-28' : 'pb-10'}`}>
         <h1 className='text-3xl font-semibold leading-6 pt-8 text-white mb-12'>Đăng Nhập</h1>
         <div className='flex justify-center'>
            <form onSubmit={handleLogin} className='container'>
               <div className='input-container'>
                  <div className='input-content'>
                     <div className='input-dist'>
                        <div className='input-type'>
                           <Input
                              name='email'
                              placeholder='Email'
                              type='text'
                              register={register}
                              errorMessage={errors.email?.message}
                           />
                           <Input
                              name='password'
                              placeholder='Password'
                              type='password'
                              hasIcon
                              register={register}
                              errorMessage={errors.password?.message}
                           />
                        </div>
                     </div>
                  </div>
               </div>

               {/* button submit */}
               <div className='voltage-button mt-7'>
                  <Button
                     type='submit'
                     isLoading={loginMutation.isLoading}
                     disabled={loginMutation.isLoading}
                     className='w-full'
                  >
                     Đăng nhập
                  </Button>
                  <svg
                     version='1.1'
                     xmlns='http://www.w3.org/2000/svg'
                     x='0px'
                     y='0px'
                     viewBox='0 0 234.6 61.3'
                     preserveAspectRatio='none'
                     xmlSpace='preserve'
                  >
                     <filter id='glow'>
                        <feGaussianBlur className='blur' result='coloredBlur' stdDeviation={2} />
                        <feTurbulence type='fractalNoise' baseFrequency='0.075' numOctaves='0.3' result='turbulence' />
                        <feDisplacementMap
                           in='SourceGraphic'
                           in2='turbulence'
                           scale={30}
                           xChannelSelector='R'
                           yChannelSelector='G'
                           result='displace'
                        />
                        <feMerge>
                           <feMergeNode in='coloredBlur' />
                           <feMergeNode in='coloredBlur' />
                           <feMergeNode in='coloredBlur' />
                           <feMergeNode in='displace' />
                           <feMergeNode in='SourceGraphic' />
                        </feMerge>
                     </filter>
                     <path
                        className='voltage line-1'
                        d='m216.3 51.2c-3.7 0-3.7-1.1-7.3-1.1-3.7 0-3.7 6.8-7.3 6.8-3.7 0-3.7-4.6-7.3-4.6-3.7 0-3.7 3.6-7.3 3.6-3.7 0-3.7-0.9-7.3-0.9-3.7 0-3.7-2.7-7.3-2.7-3.7 0-3.7 7.8-7.3 7.8-3.7 0-3.7-4.9-7.3-4.9-3.7 0-3.7-7.8-7.3-7.8-3.7 0-3.7-1.1-7.3-1.1-3.7 0-3.7 3.1-7.3 3.1-3.7 0-3.7 10.9-7.3 10.9-3.7 0-3.7-12.5-7.3-12.5-3.7 0-3.7 4.6-7.3 4.6-3.7 0-3.7 4.5-7.3 4.5-3.7 0-3.7 3.6-7.3 3.6-3.7 0-3.7-10-7.3-10-3.7 0-3.7-0.4-7.3-0.4-3.7 0-3.7 2.3-7.3 2.3-3.7 0-3.7 7.1-7.3 7.1-3.7 0-3.7-11.2-7.3-11.2-3.7 0-3.7 3.5-7.3 3.5-3.7 0-3.7 3.6-7.3 3.6-3.7 0-3.7-2.9-7.3-2.9-3.7 0-3.7 8.4-7.3 8.4-3.7 0-3.7-14.6-7.3-14.6-3.7 0-3.7 5.8-7.3 5.8-2.2 0-3.8-0.4-5.5-1.5-1.8-1.1-1.8-2.9-2.9-4.8-1-1.8 1.9-2.7 1.9-4.8 0-3.4-2.1-3.4-2.1-6.8s-9.9-3.4-9.9-6.8 8-3.4 8-6.8c0-2.2 2.1-2.4 3.1-4.2 1.1-1.8 0.2-3.9 2-5 1.8-1 3.1-7.9 5.3-7.9 3.7 0 3.7 0.9 7.3 0.9 3.7 0 3.7 6.7 7.3 6.7 3.7 0 3.7-1.8 7.3-1.8 3.7 0 3.7-0.6 7.3-0.6 3.7 0 3.7-7.8 7.3-7.8h7.3c3.7 0 3.7 4.7 7.3 4.7 3.7 0 3.7-1.1 7.3-1.1 3.7 0 3.7 11.6 7.3 11.6 3.7 0 3.7-2.6 7.3-2.6 3.7 0 3.7-12.9 7.3-12.9 3.7 0 3.7 10.9 7.3 10.9 3.7 0 3.7 1.3 7.3 1.3 3.7 0 3.7-8.7 7.3-8.7 3.7 0 3.7 11.5 7.3 11.5 3.7 0 3.7-1.4 7.3-1.4 3.7 0 3.7-2.6 7.3-2.6 3.7 0 3.7-5.8 7.3-5.8 3.7 0 3.7-1.3 7.3-1.3 3.7 0 3.7 6.6 7.3 6.6s3.7-9.3 7.3-9.3c3.7 0 3.7 0.2 7.3 0.2 3.7 0 3.7 8.5 7.3 8.5 3.7 0 3.7 0.2 7.3 0.2 3.7 0 3.7-1.5 7.3-1.5 3.7 0 3.7 1.6 7.3 1.6s3.7-5.1 7.3-5.1c2.2 0 0.6 9.6 2.4 10.7s4.1-2 5.1-0.1c1 1.8 10.3 2.2 10.3 4.3 0 3.4-10.7 3.4-10.7 6.8s1.2 3.4 1.2 6.8 1.9 3.4 1.9 6.8c0 2.2 7.2 7.7 6.2 9.5-1.1 1.8-12.3-6.5-14.1-5.5-1.7 0.9-0.1 6.2-2.2 6.2z'
                        fill='transparent'
                        stroke='#fff'
                     />
                     <path
                        className='voltage line-2'
                        d='m216.3 52.1c-3 0-3-0.5-6-0.5s-3 3-6 3-3-2-6-2-3 1.6-6 1.6-3-0.4-6-0.4-3-1.2-6-1.2-3 3.4-6 3.4-3-2.2-6-2.2-3-3.4-6-3.4-3-0.5-6-0.5-3 1.4-6 1.4-3 4.8-6 4.8-3-5.5-6-5.5-3 2-6 2-3 2-6 2-3 1.6-6 1.6-3-4.4-6-4.4-3-0.2-6-0.2-3 1-6 1-3 3.1-6 3.1-3-4.9-6-4.9-3 1.5-6 1.5-3 1.6-6 1.6-3-1.3-6-1.3-3 3.7-6 3.7-3-6.4-6-6.4-3 2.5-6 2.5h-6c-3 0-3-0.6-6-0.6s-3-1.4-6-1.4-3 0.9-6 0.9-3 4.3-6 4.3-3-3.5-6-3.5c-2.2 0-3.4-1.3-5.2-2.3-1.8-1.1-3.6-1.5-4.6-3.3s-4.4-3.5-4.4-5.7c0-3.4 0.4-3.4 0.4-6.8s2.9-3.4 2.9-6.8-0.8-3.4-0.8-6.8c0-2.2 0.3-4.2 1.3-5.9 1.1-1.8 0.8-6.2 2.6-7.3 1.8-1 5.5-2 7.7-2 3 0 3 2 6 2s3-0.5 6-0.5 3 5.1 6 5.1 3-1.1 6-1.1 3-5.6 6-5.6 3 4.8 6 4.8 3 0.6 6 0.6 3-3.8 6-3.8 3 5.1 6 5.1 3-0.6 6-0.6 3-1.2 6-1.2 3-2.6 6-2.6 3-0.6 6-0.6 3 2.9 6 2.9 3-4.1 6-4.1 3 0.1 6 0.1 3 3.7 6 3.7 3 0.1 6 0.1 3-0.6 6-0.6 3 0.7 6 0.7 3-2.2 6-2.2 3 4.4 6 4.4 3-1.7 6-1.7 3-4 6-4 3 4.7 6 4.7 3-0.5 6-0.5 3-0.8 6-0.8 3-3.8 6-3.8 3 6.3 6 6.3 3-4.8 6-4.8 3 1.9 6 1.9 3-1.9 6-1.9 3 1.3 6 1.3c2.2 0 5-0.5 6.7 0.5 1.8 1.1 2.4 4 3.5 5.8 1 1.8 0.3 3.7 0.3 5.9 0 3.4 3.4 3.4 3.4 6.8s-3.3 3.4-3.3 6.8 4 3.4 4 6.8c0 2.2-6 2.7-7 4.4-1.1 1.8 1.1 6.7-0.7 7.7-1.6 0.8-4.7-1.1-6.8-1.1z'
                        fill='transparent'
                        stroke='#fff'
                     />
                  </svg>
                  <div className='dots'>
                     <div className='dot dot-1' />
                     <div className='dot dot-2' />
                     <div className='dot dot-3' />
                     <div className='dot dot-4' />
                     <div className='dot dot-5' />
                  </div>
               </div>
               <p className='text-secondary mt-3'>
                  Bạn chưa có tài khoản?{' '}
                  <Link className='text-tprimary hover:underline' href={'/register'}>
                     Đăng ký
                  </Link>
               </p>
            </form>
         </div>
      </div>
   )
}
