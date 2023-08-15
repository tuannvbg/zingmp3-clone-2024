'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
         retry: 0
      }
   }
})
export const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
   return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
