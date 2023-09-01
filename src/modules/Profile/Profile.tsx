'use client'
import { updateProfile, uploadAvatar } from '@/apis/user.api'
import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import InputFile from '@/components/InputFile/InputFile'
import { AppContext } from '@/contexts/app.context'
import useProtectedRoute from '@/hooks/useProtectedRoute'
import useQueryProfile from '@/hooks/useQueryProfile'
import { ErrorResponse } from '@/types/utils.type'
import { setProfileFromLS } from '@/utils/auth'
import { FormDataUser, userSchema } from '@/utils/rules'
import { isAxiosUnprocessableEntity } from '@/utils/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
type FormData = Pick<FormDataUser, 'avatar' | 'name'>
const profileChema = userSchema.pick(['avatar', 'name'])

export default function Profile() {
   const [changePassword, setChangePassword] = useState<boolean>(false)
   const { setProfile } = useContext(AppContext)
   const [file, setFile] = useState<File>() //file là kiểu dữ liệu có sẵn
   const previewImage = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file]) //lấy ra file ảnh

   const {
      handleSubmit,
      register,
      setValue,
      setError,
      formState: { errors }
   } = useForm<FormData>({
      defaultValues: {
         avatar: '',
         name: ''
      },
      mode: 'onSubmit',
      resolver: yupResolver<FormData>(profileChema)
   })

   //lấy ra thông tin profile
   const { profileData, refetch } = useQueryProfile()

   //nếu có profileData thì sẽ đổ data vào form
   useEffect(() => {
      if (profileData) {
         setValue('name', profileData.name)
         setValue('avatar', profileData.avatar)
      }
   }, [profileData, setValue])

   //update profile
   const updateProfileMutation = useMutation({
      mutationFn: updateProfile
   })

   //upload avatar
   const uploadAvatarMutation = useMutation({
      mutationFn: uploadAvatar
   })

   const handleChangeInfo = handleSubmit(async (data) => {
      try {
         let avatarName = profileData?.avatar
         if (file) {
            const form = new FormData() //FormData là kiểu dữ liệu có sẵn
            form.append('image', file)
            const res = await uploadAvatarMutation.mutateAsync(form)
            avatarName = res.data.data
         }
         const res = await updateProfileMutation.mutateAsync({
            ...data,
            avatar: avatarName
         })
         toast.success(res?.data.message)
         refetch()
         setProfile(res.data.data)
         setProfileFromLS(res.data.data)
      } catch (error) {
         //nếu có lỗi trả về từ axios thì sẽ lấy ra message lỗi từ axios gắn vào setError của react-hook-form để hiển thị ra ngoài input
         if (isAxiosUnprocessableEntity<ErrorResponse<FormData>>(error)) {
            //lấy ra cái lỗi
            const formError = error.response?.data.data
            if (formError) {
               Object.keys(formError).forEach((key) => {
                  if (formError[key as keyof FormData]) {
                     setError(key as keyof FormData, {
                        message: formError[key as keyof FormData],
                        type: 'Server'
                     })
                  }
               })
            }
         }
      }
   })
   useProtectedRoute()
   return (
      <>
         <div className='mt-12 flex justify-end'>
            <button
               onClick={() => setChangePassword((prev) => !prev)}
               className='flex items-center gap-x-0.5 isHover text-base font-semibold '
            >
               {changePassword ? 'Sửa Thông Tin' : ' Đổi Mật Khẩu'}
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2.5}
                  stroke='currentColor'
                  className='w-[18px] h-[18px]'
               >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
               </svg>
            </button>
         </div>
         {changePassword ? (
            <ChangePassword />
         ) : (
            <form
               style={{
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
               }}
               onSubmit={handleChangeInfo}
               className='flex flex-wrap-reverse mt-7 md:flex-nowrap gap-y-10 md:gap-x-5 lg:gap-x-12 font-bold italic'
            >
               <div className='flex flex-col gap-y-2 w-full items-center md:w-[60%] lg:w-[70%]'>
                  <div className='input-container'>
                     <div className='input-content'>
                        <div className='input-dist'>
                           <div className='input-type'>
                              <div className='flex flex-col sm:flex-row items-center gap-y-1 gap-x-5 mb-3'>
                                 <div className='w-full sm:w-[20%] sm:text-right capitalize'>Email:</div>
                                 <div className='w-full sm:w-[80%] text-left'>{profileData?.email}</div>
                              </div>
                              <div className='flex flex-col sm:flex-row items-center gap-y-1 gap-x-5'>
                                 <div className='w-full sm:w-[20%] sm:text-right capitalize sm:-translate-y-3'>
                                    Tên:
                                 </div>
                                 <Input
                                    name='name'
                                    className='w-full sm:w-[80%] flex flex-col gap-y-1'
                                    placeholder='Tên'
                                    register={register}
                                    errorMessage={errors.name?.message}
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className='text-center'>
                     <div className='voltage-button mt-7'>
                        <Button
                           type='submit'
                           isLoading={updateProfileMutation.isLoading}
                           disabled={updateProfileMutation.isLoading}
                        >
                           Lưu thông tin
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
                              <feTurbulence
                                 type='fractalNoise'
                                 baseFrequency='0.075'
                                 numOctaves='0.3'
                                 result='turbulence'
                              />
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
                  </div>
               </div>

               <div className='w-full md:w-[40%] lg:w-[30%]'>
                  <div className='flex flex-col gap-y-3 items-center md:border-l-[1px] md:border-l-gray-200'>
                     <Image
                        src={
                           previewImage ||
                           (profileData?.avatar
                              ? `https://api-ecom.duthanhduoc.com/images/${profileData.avatar}`
                              : 'https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.67/static/media/user-default.3ff115bb.png')
                        }
                        alt='avatar'
                        width={112}
                        height={112}
                        className='w-28 h-28 rounded-full object-cover'
                     />
                     <InputFile onChange={setFile} />
                     <div className='text-secondary'>
                        <p>Dụng lượng file tối đa 1 MB</p>
                        <p>Định dạng:.JPEG, .PNG</p>
                     </div>
                  </div>
               </div>
            </form>
         )}
      </>
   )
}

type FormData2 = Pick<FormDataUser, 'password' | 'new_password' | 'confirm_password'>
const changePasswordChema = userSchema.pick(['password', 'new_password', 'confirm_password'])
const ChangePassword = () => {
   const {
      handleSubmit,
      register,
      setError,
      reset,
      formState: { errors }
   } = useForm<FormData2>({
      defaultValues: {
         password: '',
         new_password: '',
         confirm_password: ''
      },
      mode: 'onSubmit',
      resolver: yupResolver(changePasswordChema)
   })

   //update profile
   const updateProfileMutation = useMutation({
      mutationFn: updateProfile
   })

   const handleChangePassword = handleSubmit((data) => {
      updateProfileMutation.mutate(
         { password: data.password, new_password: data.new_password },
         {
            onSuccess: () => {
               toast.success('Đổi mật khẩu thành công')
               reset()
            },
            onError: (error) => {
               if (isAxiosUnprocessableEntity<ErrorResponse<FormData2>>(error)) {
                  //lấy ra cái lỗi
                  const formError = error.response?.data.data
                  if (formError) {
                     Object.keys(formError).forEach((key) => {
                        if (formError[key as keyof FormData2]) {
                           setError(key as keyof FormData2, {
                              message: formError[key as keyof FormData2],
                              type: 'Server'
                           })
                        }
                     })
                  }
               }
            }
         }
      )
   })
   return (
      <form
         style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
         }}
         onSubmit={handleChangePassword}
         className='pt-6 font-bold italic'
      >
         <div className='flex flex-col gap-y-2 w-full items-center'>
            <div className='input-container !w-[500px]'>
               <div className='input-content'>
                  <div className='input-dist'>
                     <div className='input-type'>
                        <div className='flex flex-col sm:flex-row items-center gap-y-1 gap-x-5'>
                           <div className='w-full sm:w-[35%] sm:text-right capitalize sm:-translate-y-3'>
                              Mật khẩu cũ:
                           </div>
                           <Input
                              name='password'
                              type='password'
                              hasIcon
                              className='w-full sm:w-[65%] flex flex-col gap-y-1'
                              placeholder='Mật khẩu cũ'
                              register={register}
                              errorMessage={errors.password?.message}
                           />
                        </div>
                        <div className='flex flex-col sm:flex-row items-center gap-y-1 gap-x-5'>
                           <div className='w-full sm:w-[35%] sm:text-right capitalize sm:-translate-y-3'>
                              Mật khẩu mới:
                           </div>
                           <Input
                              name='new_password'
                              type='password'
                              hasIcon
                              className=' w-full sm:w-[65%] flex flex-col gap-y-1'
                              placeholder='Mật khẩu mới'
                              register={register}
                              errorMessage={errors.new_password?.message}
                           />
                        </div>

                        <div className='flex flex-col sm:flex-row items-center gap-y-1 gap-x-5'>
                           <div className='w-full sm:w-[35%] sm:text-right capitalize sm:-translate-y-3'>
                              Nhập lại mật khẩu:
                           </div>
                           <Input
                              name='confirm_password'
                              type='password'
                              hasIcon
                              className=' w-full sm:w-[65%] flex flex-col gap-y-1'
                              placeholder='Nhập lại mật khẩu'
                              register={register}
                              errorMessage={errors.confirm_password?.message}
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className='text-center'>
               <div className='voltage-button mt-7'>
                  <Button
                     type='submit'
                     isLoading={updateProfileMutation.isLoading}
                     disabled={updateProfileMutation.isLoading}
                  >
                     Lưu thông tin
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
            </div>
         </div>
      </form>
   )
}
