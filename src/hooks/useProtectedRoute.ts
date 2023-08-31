import { AppContext } from '@/contexts/app.context'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'

export default function useProtectedRoute() {
   const { isAuthenticated } = useContext(AppContext)
   const router = useRouter()
   useEffect(() => {
      if (!isAuthenticated) {
         router.push('/login')
         toast.warning('Vui lòng đăng nhập')
      }
   }, [isAuthenticated, router])
}
