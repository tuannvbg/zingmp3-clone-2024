interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
   children: string
   isLoading?: boolean
   className?: string
}
export default function Button({ children, isLoading, className, ...rest }: Props) {
   return (
      <button {...rest} className={`disabled:cursor-not-allowed ${className}`}>
         {isLoading ? (
            <div className='mx-auto h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-b-transparent border-t-transparent'></div>
         ) : (
            children
         )}
      </button>
   )
}
