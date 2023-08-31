import { InputHTMLAttributes, useState } from 'react'
import { FieldPath, FieldValues, UseFormRegister } from 'react-hook-form'
import TogglePassword from '../TogglePassword/TogglePassword'
interface InputProps<TFieldValues extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
   errorMessage?: string
   register?: UseFormRegister<TFieldValues>
   name?: FieldPath<TFieldValues>
   className?: string
   classNameError?: string
   hasIcon?: boolean
}
export default function Input<TFieldValues extends FieldValues = FieldValues>({
   errorMessage,
   name,
   register,
   className = 'flex flex-col gap-y-1',
   classNameError = 'min-h-[20px] text-red-500 text-sm',
   hasIcon,
   type = 'text',
   ...rest
}: InputProps<TFieldValues>) {
   const registerResult = register && name ? register(name) : null
   const [openEye, setOpenEye] = useState<boolean>(false)
   return (
      <div className={className}>
         <div className='relative'>
            <input
               type={openEye ? 'text' : type}
               {...rest}
               className={`${errorMessage && '!border-red-500 !text-red-500'} ${
                  hasIcon ? `input-is !pr-12 ` : 'input-is'
               }`}
               {...registerResult}
            />
            {hasIcon && <TogglePassword openEye={openEye} onClick={() => setOpenEye((openEye) => !openEye)} />}
         </div>

         <span className={classNameError}>{errorMessage}</span>
      </div>
   )
}
