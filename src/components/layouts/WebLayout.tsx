import { Outlet } from 'react-router-dom'
import type { ReactNode } from 'react'
import Header from '@/components/organisms/porto/Header'
import Footer from '@/components/organisms/porto/Footer'

interface WebLayoutProps {
  children?: ReactNode
}

export const WebLayout = ({ children }: WebLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#F0EEE9] flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">{children || <Outlet />}</main>
      <Footer />
    </div>
  )
}

export default WebLayout
